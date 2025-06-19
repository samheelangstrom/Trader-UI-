"use client"

import type { FootballGame } from "../types"
import { RushingTooltip } from "./RushingTooltip"
import { GenericScoreboard } from "@/features/game/components/GenericScoreboard"

interface FootballScoreboardProps {
  game: FootballGame
}

export function FootballScoreboard({ game }: FootballScoreboardProps) {
  const stats = [
    { label: "Timeouts", away: game.stats.timeouts[0], home: game.stats.timeouts[1] },
    {
      label: "Passing",
      away: (
        <span className="font-mono">
          {game.stats.passing.away.completions}/{game.stats.passing.away.attempts}, {game.stats.passing.away.yards}
        </span>
      ),
      home: (
        <span className="font-mono">
          {game.stats.passing.home.completions}/{game.stats.passing.home.attempts}, {game.stats.passing.home.yards}
        </span>
      ),
    },
    {
      label: "Rushing",
      away: (
        <RushingTooltip players={game.stats.rushing.away.players}>
          <span className="font-mono">
            {game.stats.rushing.away.attempts}-{game.stats.rushing.away.yards}
          </span>
        </RushingTooltip>
      ),
      home: (
        <RushingTooltip players={game.stats.rushing.home.players}>
          <span className="font-mono">
            {game.stats.rushing.home.attempts}-{game.stats.rushing.home.yards}
          </span>
        </RushingTooltip>
      ),
    },
  ]

  return (
    <GenericScoreboard
      awayTeam={{
        abbreviation: game.awayTeam.abbreviation,
        logo: game.awayTeam.logo,
        score: game.awayTeam.score,
      }}
      homeTeam={{
        abbreviation: game.homeTeam.abbreviation,
        logo: game.homeTeam.logo,
        score: game.homeTeam.score,
      }}
      period={game.quarter}
      timeRemaining={game.timeRemaining}
      stats={stats}
      quarterScores={game.stats.quarterScores}
      note="💡 Hover over rushing stats to see individual player breakdowns"
    />
  )
}

