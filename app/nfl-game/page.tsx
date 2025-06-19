"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FootballScoreboard } from "@/features/football/components/FootballScoreboard"
import type { FootballGame } from "@/features/football/types"

export default function NflGamePage() {
  const game: FootballGame = {
    homeTeam: {
      name: "Dallas Cowboys",
      abbreviation: "DAL",
      logo: "/dallas-cowboys-logo.png",
      score: 17,
    },
    awayTeam: {
      name: "New York Giants",
      abbreviation: "NYG",
      logo: "/new-york-giants-logo.png",
      score: 10,
    },
    quarter: "4th",
    timeRemaining: "12:34",
    down: "2nd",
    distance: "7",
    possession: "home",
    stats: {
      timeouts: [2, 3],
      passing: {
        away: { completions: 14, attempts: 28, yards: 192 },
        home: { completions: 18, attempts: 33, yards: 245 },
      },
      rushing: {
        away: {
          attempts: 18,
          yards: 82,
          players: [
            { name: "RB A", attempts: 10, yards: 45 },
            { name: "RB B", attempts: 8, yards: 37 },
          ],
        },
        home: {
          attempts: 22,
          yards: 105,
          players: [
            { name: "RB C", attempts: 12, yards: 60 },
            { name: "RB D", attempts: 10, yards: 45 },
          ],
        },
      },
      quarterScores: [
        { period: "1", scores: [3, 7] },
        { period: "2", scores: [7, 7] },
        { period: "Half", scores: [10, 14] },
        { period: "3", scores: [0, 3] },
        { period: "4", scores: [0, 0] },
        { period: "Total", scores: [10, 17] },
      ],
    },
  }

  return (
    <div className="bg-[#fafafa] min-h-screen text-[#2b2c2d] p-4">
      <Link href="/" className="flex items-center gap-2 mb-4 text-[#5f6368] hover:text-[#2b2c2d]">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to fixtures</span>
      </Link>
      <FootballScoreboard game={game} />
    </div>
  )
}
