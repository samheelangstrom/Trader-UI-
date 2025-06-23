"use client";

import { Badge } from "@/components/ui/badge";
import TopNavigation from "@/components/top-navigation";
import { useMarketConfidenceContext } from "@/components/market-confidence-provider";
import ConfidenceSummary from "@/components/confidence-summary";

export default function BlenderWeightingPage() {
  const { markets } = useMarketConfidenceContext();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <TopNavigation />
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-2xl font-bold">Blender Weighting</h1>
        <ConfidenceSummary />
        <div className="space-y-4">
          {markets.map((m) => (
            <div key={m.marketId} className="flex items-center gap-4">
              <div className="w-48 font-medium">{m.event}</div>
              <Badge>{m.confidence.value}</Badge>
              <span className="text-xs text-muted-foreground">
                ({m.confidence.source})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
