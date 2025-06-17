// Main exports for the scoreboard feature
export { useScoreboard } from "./hooks/useScoreboard"
export { ScoreboardTabs } from "./components/ScoreboardTabs"
export { ScoreboardView } from "./components/ScoreboardView"
export { LiabilitiesView } from "./components/LiabilitiesView"
export { SuspensionView } from "./components/SuspensionView"
export { AlertsView } from "./components/AlertsView"
export { GameScore } from "./components/GameScore"

// Type exports
export type {
  Team,
  Game,
  GameStats,
  GameStatus,
  GamePeriod,
  ScoreboardTab,
  LiabilityData,
  SuspensionMarket,
} from "./types"

// Data exports
export { mockGame, mockLiabilityData, mockSuspensionMarkets } from "./data/mockData"
