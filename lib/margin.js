/**
 * computeMargins
 *
 * Calculates "margined" odds given:
 *  - an array of raw probabilities (will be normalized),
 *  - a base margin per selection,
 *  - optional selection‐bias weights,
 *  - a probability‐bias parameter (β),
 *  - a boundary‐probability (below which margin = 0),
 *  - and a transition‐probability (where boundary scaling starts).
 *
 * Returns an array of objects, each containing:
 *  { trueProb, weightSel, weightProbBias, weightCombined,
 *    m_init, f_scale, m_scaled, m_final, adjProb, odds }
 *
 * @param {number[]} rawP         – "True" (raw) probabilities; not required to sum to 1.
 * @param {number}   baseMargin   – Base margin per selection (m_b). Total overround = baseMargin * N.
 * @param {number[]} [selBias]    – Optional array of raw selection‐bias weights (length N). Defaults to all 1's.
 * @param {number}   [probBias=0] – β: If > 0, long shots get extra margin; if < 0, favorites get extra. Default = 0.
 * @param {number}   [pBoundary=0.1]    – If trueProb ≤ pBoundary, selection gets zero margin.
 * @param {number}   [pTransition=0.2]  – If trueProb ≥ pTransition, selection keeps full margin; between boundary and transition is linear scale.
 *
 * @returns {Array<{
 *   trueProb: number,
 *   weightSel: number,
 *   weightProbBias: number,
 *   weightCombined: number,
 *   m_init: number,
 *   f_scale: number,
 *   m_scaled: number,
 *   m_final: number,
 *   adjProb: number,
 *   odds: number
 * }>}
 */
export function computeMargins(rawP, baseMargin, selBias = null, probBias = 0.0, pBoundary = 0.1, pTransition = 0.2) {
  // 1) Normalize rawP → p so that sum(p)==1
  const totalP = rawP.reduce((sum, v) => sum + v, 0)
  if (totalP <= 0) {
    throw new Error("Sum of rawP must be > 0")
  }
  const p = rawP.map((v) => v / totalP)
  const N = p.length

  // 2) Total margin = baseMargin * N
  const M_total = baseMargin * N

  // 3) Selection-bias weights (normalize if provided)
  let w_sel = new Array(N).fill(1.0)
  if (Array.isArray(selBias)) {
    if (selBias.length !== N) {
      throw new Error("selBias length must match number of selections")
    }
    const sumRaw = selBias.reduce((sum, v) => sum + v, 0)
    if (sumRaw <= 0) {
      throw new Error("Sum of selBias must be > 0")
    }
    w_sel = selBias.map((v) => v / sumRaw)
  }

  // 4) Probability-bias weights: p_i^(-β)
  const w_prob = p.map((pi) => Math.pow(pi, -probBias))

  // 5) Combine weights and renormalize
  const combined = new Array(N)
  for (let i = 0; i < N; i++) {
    combined[i] = w_sel[i] * w_prob[i]
  }
  const sumCombined = combined.reduce((sum, v) => sum + v, 0)
  if (sumCombined <= 0) {
    throw new Error("Combined weights sum to zero; check selBias or probBias")
  }
  const w_norm = combined.map((v) => v / sumCombined)

  // 6) Initial margin allocation per selection
  const m_init = w_norm.map((w) => w * M_total)

  // 7) Compute boundary‐scaling factors f_i
  const f_scale = new Array(N)
  for (let i = 0; i < N; i++) {
    const pi = p[i]
    if (pi >= pTransition) {
      f_scale[i] = 1.0
    } else if (pi <= pBoundary) {
      f_scale[i] = 0.0
    } else {
      f_scale[i] = (pi - pBoundary) / (pTransition - pBoundary)
    }
  }

  // 8) Scale the initial margins
  const m_scaled = new Array(N)
  for (let i = 0; i < N; i++) {
    m_scaled[i] = m_init[i] * f_scale[i]
  }

  // 9) Redistribute any deficit Δ to those with f_i == 1
  const sumScaled = m_scaled.reduce((sum, v) => sum + v, 0)
  const Delta = M_total - sumScaled
  const m_final = [...m_scaled]

  // Find indices where f_scale == 1
  const fullIdx = []
  for (let i = 0; i < N; i++) {
    if (f_scale[i] === 1.0) {
      fullIdx.push(i)
    }
  }

  if (fullIdx.length > 0 && Delta > 0) {
    // Compute M_full_init = sum of m_init over fullIdx
    let M_full_init = 0
    for (const i of fullIdx) {
      M_full_init += m_init[i]
    }
    if (M_full_init > 0) {
      for (const i of fullIdx) {
        const delta_i = (m_init[i] / M_full_init) * Delta
        m_final[i] += delta_i
      }
    }
    // If M_full_init == 0, then no one to redistribute to; leave m_final as-is
  }

  // 10) Compute adjusted probabilities and implied odds
  const adjProb = new Array(N)
  const odds = new Array(N)
  for (let i = 0; i < N; i++) {
    adjProb[i] = p[i] + m_final[i]
    odds[i] = 1.0 / adjProb[i]
  }

  // Build result array
  const result = []
  for (let i = 0; i < N; i++) {
    result.push({
      trueProb: p[i],
      weightSel: w_sel[i],
      weightProbBias: w_prob[i],
      weightCombined: w_norm[i],
      m_init: m_init[i],
      f_scale: f_scale[i],
      m_scaled: m_scaled[i],
      m_final: m_final[i],
      adjProb: adjProb[i],
      odds: odds[i],
    })
  }

  return result
}
