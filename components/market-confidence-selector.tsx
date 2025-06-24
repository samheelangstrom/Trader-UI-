"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMarketConfidenceContext } from "@/components/market-confidence-provider";

interface MarketConfidenceSelectorProps {
  marketId: string;
}

export default function MarketConfidenceSelector({ marketId }: MarketConfidenceSelectorProps) {
  const { markets, updateConfidence } = useMarketConfidenceContext();
  const market = markets.find((m) => m.marketId === marketId);

  if (!market) return null;

  return (
    <div className="mt-1 flex items-center gap-2">
      <Badge>{market.confidence.value}</Badge>
      <Select
        value={market.confidence.value}
        onValueChange={(val) => updateConfidence(marketId, val as any)}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Confidence" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
