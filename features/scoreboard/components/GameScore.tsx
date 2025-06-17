"use client"

import type { Game } from "../types"

interface GameScoreProps {
  game: Game
}

export function GameScore({ game }: GameScoreProps) {
  return (
    <>
      {/* Team Logos and Score */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center">
          <img
            src={game.awayTeam.logo || "/placeholder.svg?height=100&width=100"}
            alt={game.awayTeam.name}
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
        <div className="text-4xl font-bold text-center">
          {game.awayTeam.score} - {game.homeTeam.score}
        </div>
        <div className="flex flex-col items-center">
          <img
            src={game.homeTeam.logo || "/placeholder.svg?height=100&width=100"}
            alt={game.homeTeam.name}
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Team Names and Game Status */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-[#eb6a2e]">{game.awayTeam.abbreviation}</div>
        <div className="text-xl text-[#5f6368] text-center">
          {game.period} - {game.timeRemaining}
        </div>
        <div className="text-2xl font-bold">{game.homeTeam.abbreviation}</div>
      </div>
    </>
  )
}
