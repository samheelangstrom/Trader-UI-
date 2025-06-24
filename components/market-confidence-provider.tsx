"use client"
import React, { createContext, useContext } from "react"
import { useMarketConfidence, Market } from "@/hooks/useMarketConfidence"
import { mockMarkets } from "@/lib/mockMarkets"

interface MarketConfidenceContextValue {
  markets: Market[]
  updateConfidence: (marketId: string, value: "High" | "Medium" | "Low") => void
}

const MarketConfidenceContext = createContext<MarketConfidenceContextValue | undefined>(undefined)

export function MarketConfidenceProvider({ children }: { children: React.ReactNode }) {
  const { markets, updateConfidence } = useMarketConfidence(mockMarkets)
  return (
    <MarketConfidenceContext.Provider value={{ markets, updateConfidence }}>
      {children}
    </MarketConfidenceContext.Provider>
  )
}

export function useMarketConfidenceContext() {
  const ctx = useContext(MarketConfidenceContext)
  if (!ctx) throw new Error("useMarketConfidenceContext must be used within MarketConfidenceProvider")
  return ctx
}
