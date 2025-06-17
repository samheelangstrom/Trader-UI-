export interface FootballTeam {
  id: string
  name: string
  abbreviation: string
  logo?: string
  score: number
}

export interface RushingPlayer {
  name: string
  attempts: number
  yards: number
}

export interface FootballStats {
  timeouts: [number, number] // [away, home]
  passing: {
    away: { completions: number; attempts: number; yards: number }
    home: { completions: number; attempts: number; yards: number }
  }
  rushing: {
    away: { attempts: number; yards: number; players: RushingPlayer[] }
    home: { attempts: number; yards: number; players: RushingPlayer[] }
  }
}

export interface FootballGame {
  id: string
  homeTeam: FootballTeam
  awayTeam: FootballTeam
  quarter: string
  timeRemaining: string
  down?: string
  distance?: string
  possession?: "home" | "away"
  stats: FootballStats
}
