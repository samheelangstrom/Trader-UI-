export interface ConfidenceCounts {
  High: number;
  Medium: number;
  Low: number;
}

import { Market } from "@/hooks/useMarketConfidence";

export function summarizeBySport(
  markets: Market[],
): Record<string, ConfidenceCounts> {
  const summary: Record<string, ConfidenceCounts> = {};
  for (const m of markets) {
    const sport = m.marketId.split(".")[0];
    if (!summary[sport]) {
      summary[sport] = { High: 0, Medium: 0, Low: 0 };
    }
    summary[sport][m.confidence.value]++;
  }
  return summary;
}
