"use client"

import type { FootballGame } from "../types"
import { RushingTooltip } from "./RushingTooltip"
import React from "react"
import { GenericScoreboard } from "../../scoreboard"

interface FootballScoreboardProps {
  game: FootballGame
}

export function FootballScoreboard({ game }: FootballScoreboardProps) {
  const stats = [
    {
      label: "Timeouts",
      away: game.stats.timeouts[0],
      home: game.stats.timeouts[1],
    },
    {
      label: "Passing",
      away: `${game.stats.passing.away.completions}/${game.stats.passing.away.attempts} for ${game.stats.passing.away.yards}`,
      home: `${game.stats.passing.home.completions}/${game.stats.passing.home.attempts} for ${game.stats.passing.home.yards}`,
    },
    {
      label: "Rushing",
      away: (
        <RushingTooltip players={game.stats.rushing.away.players}>
          {`${game.stats.rushing.away.attempts} for ${game.stats.rushing.away.yards}`}
        </RushingTooltip>
      ),
      home: (
        <RushingTooltip players={game.stats.rushing.home.players}>
          {`${game.stats.rushing.home.attempts} for ${game.stats.rushing.home.yards}`}
        </RushingTooltip>
      ),
    },
  ]

  const note =
    game.down && game.distance && game.possession
      ? `${game.down} & ${game.distance} on ${
          game.possession === "home"
            ? game.homeTeam.abbreviation
            : game.awayTeam.abbreviation
        }`
      : undefined

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
      note={note}
    />
  )
}

