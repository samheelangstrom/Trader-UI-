"use client"

import type React from "react"

import { useState } from "react"
import type { RushingPlayer } from "../types/football"

interface RushingTooltipProps {
  attempts: number
  yards: number
  players: RushingPlayer[]
  children: React.ReactNode
}

export function RushingTooltip({ attempts, yards, players, children }: RushingTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help border-b border-dotted border-gray-400 hover:border-gray-600"
      >
        {children}
      </div>

      {isVisible && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
          <div className="space-y-1">
            {players.map((player, index) => (
              <div key={index} className="flex justify-between gap-4">
                <span>{player.name}</span>
                <span className="font-mono">
                  {player.attempts}-{player.yards}
                </span>
              </div>
            ))}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}
