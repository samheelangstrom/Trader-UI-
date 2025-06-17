export interface Team {
  id: string
  name: string
  abbreviation: string
  logo?: string
  score: number
}

export interface GameStats {
  timeoutsLeft: [number, number]
  fouls: [number, number]
  twoPoints: [string, string]
  threePoints: [string, string]
  freeThrows: [string, string]
  quarterScores: {
    period: string
    scores: [number, number]
  }[]
}

export interface Game {
  id: string
  homeTeam: Team
  awayTeam: Team
  date: string
  time: string
  status: GameStatus
  period?: GamePeriod
  timeRemaining?: string
  stats?: GameStats
}

export type GameStatus = "scheduled" | "live" | "finished" | "postponed"
export type GamePeriod = "1st" | "2nd" | "3rd" | "4th" | "OT" | "Half"
export type ScoreboardTab = "scoreboard" | "liabilities" | "suspension" | "alerts"

export interface LiabilityData {
  marketLiabilities: {
    moneyline: string
    spread: string
    totalPoints: string
    playerProps: string
  }
  stakeFactors: {
    lakersWin: string
    celticsWin: string
    over: string
    under: string
  }
  riskAssessment: {
    percentage: number
    level: string
    recommendation: string
  }
}

export interface SuspensionMarket {
  id: string
  name: string
  status: "open" | "partial" | "suspended"
  percentage: number
}
