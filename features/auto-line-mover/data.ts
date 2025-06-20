import type { AutoLineMovementMode } from "./types"

export interface Market {
  id: string
  name: string
  status: AutoLineMovementMode
}

export interface MarketCategory {
  name: string
  markets: Market[]
}

export interface SportData {
  id: string
  name: string
  categories: MarketCategory[]
}

export const sportsData: SportData[] = [
  {
    id: "basketball",
    name: "Basketball",
    categories: [
      {
        name: "Main Markets",
        markets: [
          { id: "basketball-moneyline", name: "Moneyline", status: "Automatic" },
          { id: "basketball-spread", name: "Spread", status: "Automatic" },
          { id: "basketball-totals", name: "Totals", status: "Recommendation" },
          { id: "basketball-alt-spread", name: "Alt Spread", status: "Disabled" },
          { id: "basketball-alt-totals", name: "Alt Totals", status: "Disabled" },
        ],
      },
      {
        name: "Player Props",
        markets: [
          { id: "basketball-player-points", name: "Points", status: "Automatic" },
          { id: "basketball-player-rebounds", name: "Rebounds", status: "Recommendation" },
          { id: "basketball-player-assists", name: "Assists", status: "Recommendation" },
          { id: "basketball-player-threes", name: "3-Pointers", status: "Disabled" },
          { id: "basketball-player-steals", name: "Steals", status: "Disabled" },
          { id: "basketball-player-blocks", name: "Blocks", status: "Disabled" },
        ],
      },
      {
        name: "Team Props",
        markets: [
          { id: "basketball-team-points", name: "Team Points", status: "Automatic" },
          { id: "basketball-team-1h-points", name: "1H Points", status: "Recommendation" },
          { id: "basketball-team-2h-points", name: "2H Points", status: "Recommendation" },
          { id: "basketball-team-1q-points", name: "1Q Points", status: "Disabled" },
        ],
      },
    ],
  },
  {
    id: "football",
    name: "Football",
    categories: [
      {
        name: "Main Markets",
        markets: [
          { id: "football-moneyline", name: "Moneyline", status: "Automatic" },
          { id: "football-spread", name: "Spread", status: "Automatic" },
          { id: "football-totals", name: "Totals", status: "Recommendation" },
          { id: "football-alt-spread", name: "Alt Spread", status: "Disabled" },
          { id: "football-alt-totals", name: "Alt Totals", status: "Disabled" },
        ],
      },
      {
        name: "Player Props",
        markets: [
          { id: "football-player-passing", name: "Passing Yards", status: "Automatic" },
          { id: "football-player-rushing", name: "Rushing Yards", status: "Recommendation" },
          { id: "football-player-receiving", name: "Receiving Yards", status: "Recommendation" },
          { id: "football-player-touchdowns", name: "Touchdowns", status: "Disabled" },
          { id: "football-player-completions", name: "Completions", status: "Disabled" },
        ],
      },
    ],
  },
  {
    id: "baseball",
    name: "Baseball",
    categories: [
      {
        name: "Main Markets",
        markets: [
          { id: "baseball-moneyline", name: "Moneyline", status: "Automatic" },
          { id: "baseball-runline", name: "Run Line", status: "Automatic" },
          { id: "baseball-totals", name: "Totals", status: "Recommendation" },
          { id: "baseball-alt-runline", name: "Alt Run Line", status: "Disabled" },
          { id: "baseball-alt-totals", name: "Alt Totals", status: "Disabled" },
        ],
      },
      {
        name: "Player Props",
        markets: [
          { id: "baseball-player-hits", name: "Hits", status: "Automatic" },
          { id: "baseball-player-strikeouts", name: "Strikeouts", status: "Recommendation" },
          { id: "baseball-player-homeruns", name: "Home Runs", status: "Disabled" },
          { id: "baseball-player-rbis", name: "RBIs", status: "Disabled" },
        ],
      },
    ],
  },
]
