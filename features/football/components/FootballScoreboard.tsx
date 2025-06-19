"use client"

import type { FootballGame } from "../types"
import { RushingTooltip } from "./RushingTooltip"

interface FootballScoreboardProps {
  game: FootballGame
}

export function FootballScoreboard({ game }: FootballScoreboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NFL Live</h1>
          <p className="text-gray-600">Week 12 • Sunday</p>
        </div>

        {/* Team Logos and Score */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col items-center">
            <img
              src={game.awayTeam.logo || "/placeholder.svg"}
              alt={game.awayTeam.name}
              width={80}
              height={80}
              className="rounded-lg mb-2"
            />
            <span className="text-sm text-gray-600 font-medium">{game.awayTeam.name}</span>
          </div>

          <div className="text-6xl font-bold text-center text-gray-900">
            {game.awayTeam.score} - {game.homeTeam.score}
          </div>

          <div className="flex flex-col items-center">
            <img
              src={game.homeTeam.logo || "/placeholder.svg"}
              alt={game.homeTeam.name}
              width={80}
              height={80}
              className="rounded-lg mb-2"
            />
            <span className="text-sm text-gray-600 font-medium">{game.homeTeam.name}</span>
          </div>
        </div>

        {/* Game Status */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-orange-600">{game.awayTeam.abbreviation}</div>

          <div className="text-center">
            <div className="text-xl text-gray-700 font-semibold">
              {game.quarter} Quarter • {game.timeRemaining}
            </div>
            {game.down && game.distance && (
              <div className="text-lg text-gray-900 mt-1">
                {game.down} & {game.distance}
                {game.possession && (
                  <span className="ml-2 text-sm text-orange-600 font-medium">
                    ({game.possession === "home" ? game.homeTeam.abbreviation : game.awayTeam.abbreviation} ball)
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="text-2xl font-bold">{game.homeTeam.abbreviation}</div>
        </div>

        {/* Stats Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Timeouts */}
          <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50">
            <div className="text-center py-4 font-semibold text-lg">{game.stats.timeouts[0]}</div>
            <div className="text-center py-4 font-bold text-gray-700">Timeouts</div>
            <div className="text-center py-4 font-semibold text-lg">{game.stats.timeouts[1]}</div>
          </div>

          {/* Passing */}
          <div className="grid grid-cols-3 border-b border-gray-200">
            <div className="text-center py-4 font-mono text-lg">
              {game.stats.passing.away.completions}/{game.stats.passing.away.attempts}, {game.stats.passing.away.yards}
            </div>
            <div className="text-center py-4 font-bold text-gray-700">Passing</div>
            <div className="text-center py-4 font-mono text-lg">
              {game.stats.passing.home.completions}/{game.stats.passing.home.attempts}, {game.stats.passing.home.yards}
            </div>
          </div>

          {/* Rushing with Hover */}
          <div className="grid grid-cols-3">
            <div className="text-center py-4">
              <RushingTooltip players={game.stats.rushing.away.players}>
                <span className="font-mono text-lg">
                  {game.stats.rushing.away.attempts}-{game.stats.rushing.away.yards}
                </span>
              </RushingTooltip>
            </div>

            <div className="text-center py-4 font-bold text-gray-700">Rushing</div>

            <div className="text-center py-4">
              <RushingTooltip players={game.stats.rushing.home.players}>
                <span className="font-mono text-lg">
                  {game.stats.rushing.home.attempts}-{game.stats.rushing.home.yards}
                </span>
              </RushingTooltip>
            </div>
          </div>
        </div>

        {/* Quarter Scores */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium"></th>
                  {game.stats.quarterScores.map((quarter, index) => (
                    <th key={index} className="py-3 px-4 text-center font-medium">
                      {quarter.period === "Total" ? "Total" : quarter.period}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-left text-orange-600 font-medium flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-600 mr-2"></span>
                    {game.awayTeam.abbreviation}
                  </td>
                  {game.stats.quarterScores.map((quarter, index) => (
                    <td
                      key={index}
                      className={`py-3 px-4 text-center ${
                        quarter.period === "Half" || quarter.period === "Total" ? "text-orange-600 font-medium" : ""
                      }`}
                    >
                      {quarter.scores[0]}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-left font-medium">{game.homeTeam.abbreviation}</td>
                  {game.stats.quarterScores.map((quarter, index) => (
                    <td
                      key={index}
                      className={`py-3 px-4 text-center ${
                        quarter.period === "Half" || quarter.period === "Total" ? "font-medium" : ""
                      }`}
                    >
                      {quarter.scores[1]}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-4 text-center text-sm text-gray-500">
          💡 Hover over rushing stats to see individual player breakdowns
        </div>
      </div>
    </div>
  )
}
