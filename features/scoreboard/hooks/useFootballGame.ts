"use client"

import { useState, useEffect } from "react"
import type { FootballGame } from "../types/football"
import { mockFootballGame } from "../data/footballMockData"

export function useFootballGame(gameId: string) {
  const [game, setGame] = useState<FootballGame | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        setGame(mockFootballGame)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch game data")
        setLoading(false)
      }
    }

    fetchGame()
  }, [gameId])

  // Simulate live updates
  useEffect(() => {
    if (!game) return

    const interval = setInterval(() => {
      setGame((prevGame) => {
        if (!prevGame) return null

        // Simulate time countdown
        const [minutes, seconds] = prevGame.timeRemaining.split(":").map(Number)
        let newMinutes = minutes
        let newSeconds = seconds - 1

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 15
          newSeconds = 0
        }

        return {
          ...prevGame,
          timeRemaining: `${newMinutes}:${newSeconds.toString().padStart(2, "0")}`,
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [game])

  return { game, loading, error }
}
