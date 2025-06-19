import type { Game } from "../types"
import { GenericScoreboard } from "./GenericScoreboard"

interface ScoreboardViewProps {
  game: Game
}

export function ScoreboardView({ game }: ScoreboardViewProps) {
  if (!game.stats) return null

  const stats = [
    { label: "Timeouts Left", away: game.stats.timeoutsLeft[0], home: game.stats.timeoutsLeft[1] },
    { label: "Fouls", away: game.stats.fouls[0], home: game.stats.fouls[1] },
    { label: "2 Points", away: game.stats.twoPoints[0], home: game.stats.twoPoints[1] },
    { label: "3 Points", away: game.stats.threePoints[0], home: game.stats.threePoints[1] },
    { label: "Free Throws", away: game.stats.freeThrows[0], home: game.stats.freeThrows[1] },
  ]

  return (
    <GenericScoreboard
      awayTeam={{
        abbreviation: game.awayTeam.abbreviation,
        logo: game.awayTeam.logo,
        score: game.awayTeam.score ?? 0,
      }}
      homeTeam={{
        abbreviation: game.homeTeam.abbreviation,
        logo: game.homeTeam.logo,
        score: game.homeTeam.score ?? 0,
      }}
      period={game.period ?? ""}
      timeRemaining={game.timeRemaining ?? ""}
      stats={stats}
      quarterScores={game.stats.quarterScores}
    />
  )
}
