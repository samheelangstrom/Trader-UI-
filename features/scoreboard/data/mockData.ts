import type { Game, LiabilityData, SuspensionMarket } from "../types"

export const mockGame: Game = {
  id: "game-123",
  homeTeam: {
    id: "celtics",
    name: "Boston Celtics",
    abbreviation: "BOS",
    logo: "/placeholder.svg?height=100&width=100&text=BOS",
    score: 108,
  },
  awayTeam: {
    id: "Lakers",
    name: "Los Angeles Lakers",
    abbreviation: "LAL",
    logo: "/placeholder.svg?height=100&width=100&text=LAL",
    score: 112,
  },
  date: "2024-01-15",
  time: "8:00 PM",
  status: "live",
  period: "4th",
  timeRemaining: "2:34",
  stats: {
    timeoutsLeft: [2, 1],
    fouls: [4, 6],
    twoPoints: ["24/45", "28/52"],
    threePoints: ["12/28", "8/22"],
    freeThrows: ["16/20", "18/24"],
    quarterScores: [
      { period: "1st", scores: [28, 25] },
      { period: "2nd", scores: [26, 30] },
      { period: "Half", scores: [54, 55] },
      { period: "3rd", scores: [24, 28] },
      { period: "4th", scores: [30, 29] },
      { period: "T", scores: [108, 112] },
    ],
  },
}

export const mockLiabilityData: LiabilityData = {
  marketLiabilities: {
    moneyline: "$45,230",
    spread: "$32,100",
    totalPoints: "$28,450",
    playerProps: "$15,670",
  },
  stakeFactors: {
    lakersWin: "2.3x",
    celticsWin: "1.8x",
    over: "2.1x",
    under: "1.9x",
  },
  riskAssessment: {
    percentage: 75,
    level: "High",
    recommendation: "Consider reducing exposure on Lakers moneyline",
  },
}

export const mockSuspensionMarkets: SuspensionMarket[] = [
  { id: "moneyline", name: "Moneyline", status: "open", percentage: 100 },
  { id: "spread", name: "Spread", status: "partial", percentage: 65 },
  { id: "totals", name: "Totals", status: "open", percentage: 100 },
  { id: "props", name: "Player Props", status: "suspended", percentage: 0 },
]
