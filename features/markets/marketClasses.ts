export type Sport = "basketball" | "football"

export interface MarketClass {
  id: string
  label: string
}

export const marketClasses: Record<Sport, MarketClass[]> = {
  basketball: [
    { id: "fixture", label: "Fixture Markets" },
    { id: "player", label: "Player Matchup Handicap" },
    { id: "combined", label: "Player Combined" },
    { id: "player-markets", label: "Player Markets" },
    { id: "player-matchup", label: "Player Matchup" },
    { id: "player-milestone", label: "Player Milestone" },
    { id: "player-race", label: "Player Race" },
    { id: "most", label: "Player Most" },
  ],
  football: [
    { id: "fixture", label: "Fixture Markets" },
    { id: "player", label: "Player Props" },
    { id: "passing", label: "Passing Yards" },
    { id: "receiving", label: "Receiving Yards" },
  ],
}
