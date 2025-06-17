"use client"

import type { ScoreboardTab } from "../types"

interface ScoreboardTabsProps {
  activeTab: ScoreboardTab
  onTabChange: (tab: ScoreboardTab) => void
}

export function ScoreboardTabs({ activeTab, onTabChange }: ScoreboardTabsProps) {
  const tabs: { key: ScoreboardTab; label: string }[] = [
    { key: "scoreboard", label: "Scoreboard" },
    { key: "liabilities", label: "Liabilities and Stake Factor" },
    { key: "suspension", label: "Suspension View" },
    { key: "alerts", label: "Alerts" },
  ]

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md bg-[#f1f2f3] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === tab.key ? "bg-white text-[#eb6a2e] shadow-sm" : "text-[#5f6368] hover:text-[#2b2c2d]"
            }`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
