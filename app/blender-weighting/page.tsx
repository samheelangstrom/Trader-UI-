"use client"

import { Badge } from "@/components/ui/badge"
import TopNavigation from "@/components/top-navigation"
import { useMarketConfidence } from "@/hooks/useMarketConfidence"
import { mockMarkets } from "@/lib/mockMarkets"

export default function BlenderWeightingPage() {
  const { markets } = useMarketConfidence(mockMarkets)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <TopNavigation />
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Blender Weighting</h1>
        <div className="space-y-4">
          {markets.map((m) => (
            <div key={m.marketId} className="flex items-center gap-4">
              <div className="w-48 font-medium">{m.event}</div>
              <Badge>{m.confidence.value}</Badge>
              <span className="text-xs text-muted-foreground">({m.confidence.source})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
