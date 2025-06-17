import type { FootballGame } from "../types/football"

export const mockGame: FootballGame = {
  id: "steelers-ravens",
  homeTeam: {
    id: "steelers",
    name: "Pittsburgh Steelers",
    abbreviation: "PIT",
    logo: "/placeholder.svg?height=80&width=80&text=PIT",
    score: 21,
  },
  awayTeam: {
    id: "ravens",
    name: "Baltimore Ravens",
    abbreviation: "BAL",
    logo: "/placeholder.svg?height=80&width=80&text=BAL",
    score: 17,
  },
  quarter: "3rd",
  timeRemaining: "8:42",
  down: "2nd",
  distance: "7",
  possession: "home",
  stats: {
    timeouts: [2, 1],
    passing: {
      away: { completions: 18, attempts: 26, yards: 234 },
      home: { completions: 21, attempts: 30, yards: 287 },
    },
    rushing: {
      away: {
        attempts: 22,
        yards: 156,
        players: [
          { name: "Henry", attempts: 14, yards: 98 },
          { name: "Jackson", attempts: 6, yards: 42 },
          { name: "Hill", attempts: 2, yards: 16 },
        ],
      },
      home: {
        attempts: 18,
        yards: 124,
        players: [
          { name: "Warren", attempts: 10, yards: 68 },
          { name: "Harris", attempts: 6, yards: 38 },
          { name: "Wilson", attempts: 2, yards: 18 },
        ],
      },
    },
  },
}
