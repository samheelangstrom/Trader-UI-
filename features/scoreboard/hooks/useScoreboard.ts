"use client"

import { useState, useEffect } from "react"
import type { Game, LiabilityData, SuspensionMarket, ScoreboardTab } from "../types"
import { mockGame, mockLiabilityData, mockSuspensionMarkets } from "../data/mockData"

export function useScoreboard(gameId: string) {
  const [game, setGame] = useState<Game | null>(null)
  const [liabilityData, setLiabilityData] = useState<LiabilityData | null>(null)
  const [suspensionMarkets, setSuspensionMarkets] = useState<SuspensionMarket[]>([])
  const [activeTab, setActiveTab] = useState<ScoreboardTab>("scoreboard")
  const [expandedMarketClass, setExpandedMarketClass] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

        setGame(mockGame)
        setLiabilityData(mockLiabilityData)
        setSuspensionMarkets(mockSuspensionMarkets)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch game data")
        setLoading(false)
      }
    }

    fetchData()
  }, [gameId])

  const handleTabChange = (tab: ScoreboardTab) => {
    setActiveTab(tab)
  }

  const handleToggleExpansion = (marketClass: string) => {
    setExpandedMarketClass(expandedMarketClass === marketClass ? null : marketClass)
  }

  return {
    game,
    liabilityData,
    suspensionMarkets,
    activeTab,
    expandedMarketClass,
    loading,
    error,
    handleTabChange,
    handleToggleExpansion,
  }
}
