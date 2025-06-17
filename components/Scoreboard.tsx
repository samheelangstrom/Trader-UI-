"use client"

import { useScoreboard } from "../features/scoreboard/hooks/useScoreboard"
import { ScoreboardTabs } from "../features/scoreboard/components/ScoreboardTabs"
import { ScoreboardView } from "../features/scoreboard/components/ScoreboardView"
import { LiabilitiesView } from "../features/scoreboard/components/LiabilitiesView"
import { SuspensionView } from "../features/scoreboard/components/SuspensionView"
import { AlertsView } from "../features/scoreboard/components/AlertsView"

interface ScoreboardProps {
  gameId: string
}

export default function Scoreboard({ gameId }: ScoreboardProps) {
  const {
    game,
    liabilityData,
    suspensionMarkets,
    activeTab,
    expandedMarketClass,
    loading,
    error,
    handleTabChange,
    handleToggleExpansion,
  } = useScoreboard(gameId)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#eb6a2e] mx-auto mb-4"></div>
          <p className="text-[#5f6368]">Loading game data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#eb6a2e] text-white rounded-md hover:bg-[#d55a1e]"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-[#5f6368]">Game not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2b2c2d] mb-2">Live Game Center</h1>
          <p className="text-[#5f6368]">
            {game.date} • {game.time}
          </p>
        </div>

        {/* Navigation Tabs */}
        <ScoreboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab Content */}
        {activeTab === "scoreboard" && <ScoreboardView game={game} />}

        {activeTab === "liabilities" && liabilityData && <LiabilitiesView data={liabilityData} />}

        {activeTab === "suspension" && (
          <SuspensionView
            markets={suspensionMarkets}
            expandedMarketClass={expandedMarketClass}
            onToggleExpansion={handleToggleExpansion}
          />
        )}

        {activeTab === "alerts" && <AlertsView />}
      </div>
    </div>
  )
}
