"use client"

import { useEffect, useState } from 'react'
import { mockMarkets } from '@/lib/mockMarkets'

export type ConfidenceValue = 'High' | 'Medium' | 'Low'

export interface Market {
  marketId: string
  event: string
  startTime: string
  currentPrice: number
  simPrice: number
  lean: string
  confidence: {
    value: ConfidenceValue
    source: string
    setBy: string
    updatedAt: string
  }
  endorsed: boolean
}

const STORAGE_KEY = 'market-confidences'

export function useMarketConfidence(initial: Market[] = mockMarkets) {
  const [markets, setMarkets] = useState<Market[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          return JSON.parse(stored) as Market[]
        } catch {
          /* ignore malformed storage */
        }
      }
    }
    return initial
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(markets))
    }
  }, [markets])

  const updateConfidence = (marketId: string, newConfidence: ConfidenceValue) => {
    setMarkets((prev) =>
      prev.map((m) =>
        m.marketId === marketId
          ? {
              ...m,
              confidence: {
                value: newConfidence,
                source: 'Manual',
                setBy: 'Trader1',
                updatedAt: new Date().toISOString(),
              },
            }
          : m,
      ),
    )
  }

  return { markets, updateConfidence }
}
