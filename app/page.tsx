import FootballScoreboard from "../components/FootballScoreboard"
import { mockGame } from "../data/mockData"

export default function Home() {
  return <FootballScoreboard game={mockGame} />
}
