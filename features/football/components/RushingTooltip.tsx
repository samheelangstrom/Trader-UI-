"use client"

import { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { RushingPlayer } from "../types"

interface RushingTooltipProps {
  players: RushingPlayer[]
  children: ReactNode
}

export function RushingTooltip({ players, children }: RushingTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="text-left space-y-1">
            {players.map((p, i) => (
              <div key={i}>
                {p.name}: {p.attempts} for {p.yards}
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
