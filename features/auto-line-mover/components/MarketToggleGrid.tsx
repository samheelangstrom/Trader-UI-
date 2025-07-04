"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AutoLineMovementMode } from "../types"
import type { SportData } from "../data"
import { sportsData } from "../data"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export function MarketToggleGrid() {
  const [sports, setSports] = useState<SportData[]>(sportsData)
  const [activeSport, setActiveSport] = useState<string>("basketball")

  const handleToggleMarket = (sportId: string, marketId: string) => {
    setSports(
      sports.map((sport) => {
        if (sport.id !== sportId) return sport

        return {
          ...sport,
          categories: sport.categories.map((category) => {
            return {
              ...category,
              markets: category.markets.map((market) => {
                if (market.id !== marketId) return market

                // Cycle through statuses: Automatic -> Recommendation -> Disabled -> Automatic
                let newStatus: AutoLineMovementMode
                if (market.status === "Automatic") newStatus = "Recommendation"
                else if (market.status === "Recommendation") newStatus = "Disabled"
                else newStatus = "Automatic"

                return {
                  ...market,
                  status: newStatus,
                }
              }),
            }
          }),
        }
      }),
    )
  }

  const getStatusColor = (status: AutoLineMovementMode) => {
    switch (status) {
      case "Automatic":
        return "bg-green-500"
      case "Recommendation":
        return "bg-yellow-400"
      case "Disabled":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusText = (status: AutoLineMovementMode) => {
    switch (status) {
      case "Automatic":
        return "Auto"
      case "Recommendation":
        return "Rec"
      case "Disabled":
        return "Off"
      default:
        return "Off"
    }
  }

  const activeSportData = sports.find((sport) => sport.id === activeSport)

  return (
    <div className="bg-white rounded-md overflow-hidden border border-[#dcdddf] p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Market Auto Line Mover Status</h3>
          <p className="text-sm text-gray-500">Click on a market to toggle its auto line mover status</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Automatic</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-xs">Recommendation</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-xs">Disabled</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue={activeSport} onValueChange={setActiveSport} className="w-full">
        <TabsList className="mb-4">
          {sports.map((sport) => (
            <TabsTrigger key={sport.id} value={sport.id} className="px-4 py-2">
              {sport.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sports.map((sport) => (
          <TabsContent key={sport.id} value={sport.id} className="mt-0">
            {sport.categories.map((category) => (
              <div key={category.name} className="mb-6">
                <div className="flex items-center mb-2">
                  <h4 className="text-sm font-medium">{category.name}</h4>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-xs">
                          Click on a market to cycle through modes: Automatic → Recommendation → Disabled
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {category.markets.map((market) => (
                    <button
                      key={market.id}
                      onClick={() => handleToggleMarket(sport.id, market.id)}
                      className={`
                        relative p-3 rounded-md border border-gray-200 hover:border-gray-300 
                        transition-all duration-200 text-left
                        ${market.status === "Disabled" ? "bg-gray-50" : "bg-white"}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{market.name}</span>
                        <span
                          className={`
                            ${getStatusColor(market.status)} 
                            text-white text-xs px-2 py-0.5 rounded-full
                          `}
                        >
                          {getStatusText(market.status)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
