"use client"

import { ReactNode } from "react"

export interface ScoreboardStat {
  label: string
  away: ReactNode
  home: ReactNode
}

export interface TeamInfo {
  abbreviation: string
  logo?: string
  score: number
}

interface GenericScoreboardProps {
  awayTeam: TeamInfo
  homeTeam: TeamInfo
  period: string
  timeRemaining: string
  stats: ScoreboardStat[]
  quarterScores: { period: string; scores: [number, number] }[]
  note?: ReactNode
}

export function GenericScoreboard({
  awayTeam,
  homeTeam,
  period,
  timeRemaining,
  stats,
  quarterScores,
  note,
}: GenericScoreboardProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center">
          <img
            src={awayTeam.logo || "/placeholder.svg"}
            alt={awayTeam.abbreviation}
            width={100}
            height={100}
          />
        </div>
        <div className="text-4xl font-bold">
          {awayTeam.score} - {homeTeam.score}
        </div>
        <div className="flex flex-col items-center">
          <img
            src={homeTeam.logo || "/placeholder.svg"}
            alt={homeTeam.abbreviation}
            width={100}
            height={100}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-[#eb6a2e]">
          {awayTeam.abbreviation}
        </div>
        <div className="text-xl text-[#5f6368]">
          {period} - {timeRemaining}
        </div>
        <div className="text-2xl font-bold">{homeTeam.abbreviation}</div>
      </div>

      <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden mb-6">
        {stats.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-3${idx < stats.length - 1 ? " border-b border-[#dcdddf]" : ""}`}
          >
            <div className="text-center py-3">{row.away}</div>
            <div className="text-center py-3 font-medium">{row.label}</div>
            <div className="text-center py-3">{row.home}</div>
          </div>
        ))}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                <th className="py-3 px-4 text-left font-medium"></th>
                {quarterScores.map((quarter, index) => (
                  <th key={index} className="py-3 px-4 text-center font-medium">
                    {quarter.period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#dcdddf]">
                <td className="py-3 px-4 text-left text-[#eb6a2e] font-medium flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#eb6a2e] mr-2"></span>
                  {awayTeam.abbreviation}
                </td>
                {quarterScores.map((quarter, index) => (
                  <td
                    key={index}
                    className={`py-3 px-4 text-center ${
                      quarter.period === "Half" || quarter.period === "Total" || quarter.period === "T"
                        ? "text-[#eb6a2e] font-medium"
                        : ""
                    }`}
                  >
                    {quarter.scores[0]}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-left">{homeTeam.abbreviation}</td>
                {quarterScores.map((quarter, index) => (
                  <td
                    key={index}
                    className={`py-3 px-4 text-center ${
                      quarter.period === "Half" || quarter.period === "Total" || quarter.period === "T"
                        ? "font-medium"
                        : ""
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

      {note && (
        <div className="mt-4 text-center text-sm text-[#5f6368]">{note}</div>
      )}
    </>
  )
}

