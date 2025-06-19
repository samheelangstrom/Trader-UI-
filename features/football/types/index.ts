export interface FootballTeam {
  name: string
  abbreviation: string
  logo?: string
  score: number
}

export interface PassingStats {
  completions: number
  attempts: number
  yards: number
}

export interface RushingPlayer {
  name: string
  attempts: number
  yards: number
}

export interface RushingStats {
  attempts: number
  yards: number
  players: RushingPlayer[]
}

export interface FootballGameStats {
  timeouts: [number, number]
  passing: {
    away: PassingStats
    home: PassingStats
  }
  rushing: {
    away: RushingStats
    home: RushingStats
  }
  quarterScores: {
    period: string
    scores: [number, number]
  }[]
}

export interface FootballGame {
  homeTeam: FootballTeam
  awayTeam: FootballTeam
  quarter: string
  timeRemaining: string
  down?: string
  distance?: string
  possession?: "home" | "away"
  stats: FootballGameStats
}
