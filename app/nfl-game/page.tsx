"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ChevronDown,
  X,
  User,
  CheckCircle2,
  Circle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { FootballScoreboard } from "@/features/football/components/FootballScoreboard"
import type { FootballGame } from "@/features/football/types"
import { ScoreboardTabs } from "@/features/basketball"

export default function NflGamePage() {
  const [scoreboardTab, setScoreboardTab] = useState(
    "scoreboard" as "scoreboard" | "liabilities" | "suspension" | "alerts"
  )
  const [expandedMarketClass, setExpandedMarketClass] = useState<string | null>(
    null
  )
  const [expandedSections, setExpandedSections] = useState({
    moneyline: true,
  })

  const alerts = [
    {
      id: 1,
      market: "Cowboys Moneyline",
      badge: "ALM",
      time: "2m",
      taken: "1.90",
      current: "1.85",
      marketAv: "1.80",
      comp: "1.95",
      recommendation: "Adjust price",
      severity: "high",
    },
    {
      id: 2,
      market: "Total Points O45.5",
      badge: "ALM",
      time: "5m",
      taken: "1.90",
      current: "1.90",
      marketAv: "1.85",
      comp: "1.88",
      recommendation: "No action",
      severity: "low",
    },
  ]

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .alert-scroller {
        max-height: 400px;
        overflow-y: auto;
        scrollbar-width: thin;
      }

      .alert-scroller::-webkit-scrollbar {
        width: 6px;
      }

      .alert-scroller::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      .alert-scroller::-webkit-scrollbar-thumb {
        background: #dcdddf;
        border-radius: 3px;
      }

      .alert-scroller::-webkit-scrollbar-thumb:hover {
        background: #c1c2c5;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const toggleMarketClassExpansion = (marketClass: string) => {
    setExpandedMarketClass(
      expandedMarketClass === marketClass ? null : marketClass
    )
  }

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections],
    })
  }

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
      <Link
        href="/"
        className="flex items-center gap-2 mb-4 text-[#5f6368] hover:text-[#2b2c2d]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to fixtures</span>
      </Link>

      <ScoreboardTabs activeTab={scoreboardTab} onTabChange={setScoreboardTab} />

      {scoreboardTab === "scoreboard" && <FootballScoreboard game={game} />}

      {scoreboardTab === "alerts" && (
        <div className="mb-6 resize-y overflow-auto min-h-[400px] max-h-[800px] border border-[#dcdddf] rounded-md">
          <div className="flex flex-col h-full p-4">
            <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden flex-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                    <th className="py-3 px-4 text-left font-medium">Alert Information</th>
                    <th className="py-3 px-4 text-left font-medium">Taken</th>
                    <th className="py-3 px-4 text-left font-medium">Current</th>
                    <th className="py-3 px-4 text-left font-medium">Market Av.</th>
                    <th className="py-3 px-4 text-left font-medium">Comp.</th>
                    <th className="py-3 px-4 text-left font-medium">Recommendation</th>
                  </tr>
                </thead>
              </table>
              <div className="alert-scroller flex-1 overflow-y-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {alerts.map((alert) => (
                      <tr key={alert.id} className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              {alert.severity === "high" ? (
                                <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 9v4M12 17h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FECACA" />
                                  </svg>
                                </div>
                              ) : alert.severity === "medium" ? (
                                <div className="w-6 h-6 flex items-center justify-center bg-orange-100 rounded-full">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 9v4M12 17h.01" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFEDD5" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 9v4M12 17h.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#DBEAFE" />
                                  </svg>
                                </div>
                              )}
                              <div className="font-medium">{alert.market}</div>
                            </div>
                            <div className="flex items-center gap-2 ml-8">
                              <span className="text-[#5f6368]">{alert.time}</span>
                              <span className="px-2 py-0.5 bg-[#FFC107] text-white rounded-full text-xs">{alert.badge}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{alert.taken}</td>
                        <td className="py-3 px-4">{alert.current}</td>
                        <td className="py-3 px-4">{alert.marketAv}</td>
                        <td className="py-3 px-4">{alert.comp}</td>
                        <td className="py-3 px-4">{alert.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Class */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Market Class</h4>
        <div className="flex gap-2 flex-wrap">
          <div
            className="flex-1 min-w-[120px] p-2 bg-[#62c11e] bg-opacity-20 border border-[#62c11e] rounded text-center cursor-pointer hover:bg-opacity-30"
            onClick={() => toggleMarketClassExpansion("fixture")}
          >
            <div className="text-xs font-medium">Fixture</div>
            <div className="text-xs text-[#5f6368]">100% Open</div>
          </div>
          <div
            className="flex-1 min-w-[120px] p-2 bg-[#FFC107] bg-opacity-20 border border-[#FFC107] rounded text-center cursor-pointer hover:bg-opacity-30"
            onClick={() => toggleMarketClassExpansion("player")}
          >
            <div className="text-xs font-medium">Player</div>
            <div className="text-xs text-[#5f6368]">75% Open</div>
          </div>
        </div>

        {expandedMarketClass && (
          <div className="mt-4 border border-[#dcdddf] rounded-md overflow-hidden">
            <div className="p-2 bg-[#2b2c2d] text-white text-sm font-medium flex justify-between items-center">
              <span>
                {expandedMarketClass === "fixture" ? "Fixture Markets" : "Player Markets"}
              </span>
              <button onClick={() => setExpandedMarketClass(null)} className="text-white hover:text-gray-300">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#2b2c2d] text-white">
                    <th className="p-2 text-left w-16"></th>
                    <th className="p-2 text-center w-16">MM</th>
                    <th className="p-2 text-center w-16">1H</th>
                    <th className="p-2 text-center w-16">1Q</th>
                    <th className="p-2 text-center w-16">2Q</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#444]">
                    <td className="p-2 bg-[#333] text-white">M</td>
                    <td className="p-2 bg-[#62c11e]"></td>
                    <td className="p-2 bg-[#333]"></td>
                    <td className="p-2 bg-[#333]"></td>
                    <td className="p-2 bg-[#333]"></td>
                  </tr>
                  <tr>
                    <td className="p-2 bg-[#333] text-white">S</td>
                    <td className="p-2 bg-[#333]"></td>
                    <td className="p-2 bg-[#62c11e]"></td>
                    <td className="p-2 bg-[#333]"></td>
                    <td className="p-2 bg-[#333]"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Markets */}
      <div className="border border-[#dcdddf] rounded-md mb-4 overflow-hidden">
        <div
          className="flex items-center justify-between bg-white p-3 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection("moneyline")}
        >
          <div className="flex items-center">
            <ChevronDown
              className={`h-4 w-4 mr-2 transition-transform ${!expandedSections.moneyline ? "-rotate-90" : ""}`}
            />
            <span className="font-medium">Moneyline</span>
          </div>
        </div>
        {expandedSections.moneyline && (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sim Competitor Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rec. Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% SF</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Dallas Cowboys</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.90</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">New York Giants</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.05</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
