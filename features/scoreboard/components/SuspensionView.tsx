"use client"

import { X, User, CheckCircle2, Circle } from "lucide-react"
import type { SuspensionMarket } from "../types"

interface SuspensionViewProps {
  markets: SuspensionMarket[]
  expandedMarketClass: string | null
  onToggleExpansion: (marketClass: string) => void
}

export function SuspensionView({ markets, expandedMarketClass, onToggleExpansion }: SuspensionViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-[#62c11e]"
      case "partial":
        return "bg-[#FFC107]"
      case "suspended":
        return "bg-[#F44336]"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string, percentage: number) => {
    switch (status) {
      case "open":
        return `${percentage}% Open`
      case "partial":
        return `${percentage}% Open`
      case "suspended":
        return `${percentage}% Open`
      default:
        return "Unknown"
    }
  }

  return (
    <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden mb-6">
      <div className="p-4 border-b border-[#dcdddf]">
        <h3 className="text-lg font-medium mb-2">Market Suspension Status</h3>
        <p className="text-sm text-[#5f6368] mb-4">
          Overview of market suspension status from market class to selection level.
        </p>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#62c11e] rounded"></div>
            <span className="text-xs">Open</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#FFC107] rounded"></div>
            <span className="text-xs">Partially Suspended</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#F44336] rounded"></div>
            <span className="text-xs">Fully Suspended</span>
          </div>
        </div>

        {/* Market Class Level */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Market Class</h4>
          <div className="flex gap-2 flex-wrap">
            {markets.map((market) => (
              <div
                key={market.id}
                className={`flex-1 min-w-[120px] p-2 ${getStatusColor(market.status)} bg-opacity-20 border ${getStatusColor(market.status).replace("bg-", "border-")} rounded text-center cursor-pointer hover:bg-opacity-30`}
                onClick={() => onToggleExpansion(market.id)}
              >
                <div className="text-xs font-medium">{market.name}</div>
                <div className="text-xs text-[#5f6368]">{getStatusText(market.status, market.percentage)}</div>
              </div>
            ))}
          </div>

          {/* Heat Map for expanded market class */}
          {expandedMarketClass && (
            <div className="mt-4 border border-[#dcdddf] rounded-md overflow-hidden">
              <div className="p-2 bg-[#2b2c2d] text-white text-sm font-medium flex justify-between items-center">
                <span>{markets.find((m) => m.id === expandedMarketClass)?.name} Markets</span>
                <button onClick={() => onToggleExpansion("")} className="text-white hover:text-gray-300">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 p-2 bg-[#1a1a1a] text-white text-xs">
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center bg-[#F44336] text-white p-1 rounded">
                    <code className="text-xs">&lt;/&gt;</code>
                  </div>
                  <span>Automatic suspension</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center bg-[#F44336] text-white p-1 rounded">
                    <User className="h-3 w-3" />
                  </div>
                  <span>Manual suspension</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center bg-[#62c11e] text-white p-1 rounded">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span>Temporary override</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center bg-[#62c11e] text-white p-1 rounded">
                    <Circle className="h-3 w-3" />
                  </div>
                  <span>Permanent override</span>
                </div>
              </div>

              {/* Sample Heat Map Content */}
              <div className="p-4 text-center text-[#5f6368]">
                Heat map data for {expandedMarketClass} markets would be displayed here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
