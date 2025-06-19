"use client"

import type { FootballGame } from "../types"
import { RushingTooltip } from "./RushingTooltip"

interface FootballScoreboardProps {
  game: FootballGame
}

export function FootballScoreboard({ game }: FootballScoreboardProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center">
          <img
            src={game.awayTeam.logo || "/placeholder.svg"}
            alt={game.awayTeam.name}
            width={100}
            height={100}
          />
        </div>
        <div className="text-4xl font-bold">
          {game.awayTeam.score} - {game.homeTeam.score}
        </div>
        <div className="flex flex-col items-center">
          <img
            src={game.homeTeam.logo || "/placeholder.svg"}
            alt={game.homeTeam.name}
            width={100}
            height={100}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-[#eb6a2e]">{game.awayTeam.abbreviation}</div>
        <div className="text-xl text-[#5f6368]">
          {game.quarter} - {game.timeRemaining}
        </div>
        <div className="text-2xl font-bold">{game.homeTeam.abbreviation}</div>
      </div>

      <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden mb-6">
        <div className="grid grid-cols-3 border-b border-[#dcdddf]">
          <div className="text-center py-3">{game.stats.timeouts[0]}</div>
          <div className="text-center py-3 font-medium">Timeouts</div>
          <div className="text-center py-3">{game.stats.timeouts[1]}</div>
        </div>
        <div className="grid grid-cols-3 border-b border-[#dcdddf]">
          <div className="text-center py-3 font-mono">
            {game.stats.passing.away.completions}/{game.stats.passing.away.attempts}, {game.stats.passing.away.yards}
          </div>
          <div className="text-center py-3 font-medium">Passing</div>
          <div className="text-center py-3 font-mono">
            {game.stats.passing.home.completions}/{game.stats.passing.home.attempts}, {game.stats.passing.home.yards}
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="text-center py-3">
            <RushingTooltip players={game.stats.rushing.away.players}>
              <span className="font-mono">
                {game.stats.rushing.away.attempts}-{game.stats.rushing.away.yards}
              </span>
            </RushingTooltip>
          </div>
          <div className="text-center py-3 font-medium">Rushing</div>
          <div className="text-center py-3">
            <RushingTooltip players={game.stats.rushing.home.players}>
              <span className="font-mono">
                {game.stats.rushing.home.attempts}-{game.stats.rushing.home.yards}
              </span>
            </RushingTooltip>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                <th className="py-3 px-4 text-left font-medium"></th>
                {game.stats.quarterScores.map((quarter, index) => (
                  <th key={index} className="py-3 px-4 text-center font-medium">
                    {quarter.period === "Total" ? "Total" : quarter.period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#dcdddf]">
                <td className="py-3 px-4 text-left text-[#eb6a2e] font-medium flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#eb6a2e] mr-2"></span>
                  {game.awayTeam.abbreviation}
                </td>
                {game.stats.quarterScores.map((quarter, index) => (
                  <td
                    key={index}
                    className={`py-3 px-4 text-center ${
                      quarter.period === "Half" || quarter.period === "Total" ? "text-[#eb6a2e] font-medium" : ""
                    }`}
                  >
                    {quarter.scores[0]}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-left">{game.homeTeam.abbreviation}</td>
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

      <div className="mt-4 text-center text-sm text-[#5f6368]">
        💡 Hover over rushing stats to see individual player breakdowns
      </div>
    </>
  )
}

