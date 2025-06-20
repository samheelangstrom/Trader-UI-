"use client"

import { useState } from "react"
import { useMarketConfidence } from "@/hooks/useMarketConfidence"
import { mockMarkets } from "@/lib/mockMarkets"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopNavigation from "@/components/top-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AutoLineMovementView } from "@/features/auto-line-mover"

const confidenceColors: Record<string, string> = {
  High: 'bg-green-500',
  Medium: 'bg-yellow-400',
  Low: 'bg-red-500',
}

function ConfidenceInputUI() {
  const { markets, updateConfidence } = useMarketConfidence(mockMarkets)

  const handleConfidenceChange = (marketId: string, newConfidence: string) => {
    updateConfidence(marketId, newConfidence as any)
  }

  return (
    <div className="p-6 space-y-4">
      {markets.map((market) => (
        <Card key={market.marketId}>
          <CardContent className="grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 font-semibold">{market.event}</div>
            <div className="col-span-1 text-sm text-gray-500">
              {new Date(market.startTime).toLocaleString()}
            </div>
            <div className="col-span-1">Current Price: {market.currentPrice}</div>
            <div className="col-span-1">Lean: {market.lean}</div>
            <div className="col-span-1 flex items-center gap-2">
              <Badge className={confidenceColors[market.confidence.value]}>
                {market.confidence.value}
              </Badge>
              <span className="text-xs text-muted-foreground">
                ({market.confidence.source})
              </span>
            </div>
            <div className="col-span-1">
              <Select
                value={market.confidence.value}
                onValueChange={(val) =>
                  handleConfidenceChange(market.marketId, val)
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


const BlenderWeightingConfig = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Blender Weighting Configuration</h2>
    <div className="bg-white rounded-md shadow p-4">
      <p className="text-sm text-gray-500 mb-4">
        Configure the weighting of different models in the blender system to optimize prediction accuracy across
        different sports and market types.
      </p>

      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">NBA Model Weights</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Statistical Model</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Market-Based Model</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Player Performance Model</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">NFL Model Weights</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Statistical Model</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Market-Based Model</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Weather Impact Model</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </div>
        <ConfidenceInputUI />
      </div>
    </div>
  </div>
)

const CompetitorConfigurationConfig = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Competitor Configuration</h2>
    <div className="bg-white rounded-md shadow p-4">
      <p className="text-sm text-gray-500 mb-4">
        Configure competitor tracking settings, including which competitors to monitor, markets to track, and response
        thresholds.
      </p>

      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Tracked Competitors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border rounded p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Competitor A</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Priority: High</div>
              <div className="text-xs text-gray-500">Markets: All</div>
            </div>
            <div className="border rounded p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Competitor B</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Priority: Medium</div>
              <div className="text-xs text-gray-500">Markets: NBA, NFL</div>
            </div>
            <div className="border rounded p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Competitor C</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Inactive</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Priority: Low</div>
              <div className="text-xs text-gray-500">Markets: MLB only</div>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Response Configuration</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Auto-Match Threshold</span>
              <span className="text-sm font-medium">±10 cents</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Match Delay</span>
              <span className="text-sm font-medium">30 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Notification Threshold</span>
              <span className="text-sm font-medium">±20 cents</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Market Exclusions</h3>
          <div className="text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>Player Props (all sports)</li>
              <li>Live In-Play Markets</li>
              <li>Futures beyond 30 days</li>
              <li>Parlays and Teasers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function ModelConfigurationPage() {
  const [activeTab, setActiveTab] = useState("alm")

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <TopNavigation />

      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Model Configuration</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alm">Auto Line Mover</TabsTrigger>
            <TabsTrigger value="blender">Blender Weighting</TabsTrigger>
            <TabsTrigger value="competitor">Competitor Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="alm">
            <AutoLineMovementView />
          </TabsContent>

          <TabsContent value="blender">
            <BlenderWeightingConfig />
          </TabsContent>

          <TabsContent value="competitor">
            <CompetitorConfigurationConfig />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
