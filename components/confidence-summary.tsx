"use client";

import { useMarketConfidence } from "@/hooks/useMarketConfidence";
import { mockMarkets } from "@/lib/mockMarkets";
import { summarizeBySport } from "@/lib/confidenceSummary";

export default function ConfidenceSummary() {
  const { markets } = useMarketConfidence(mockMarkets);
  const summary = summarizeBySport(markets);
  const sports = Object.keys(summary);
  if (sports.length === 0) return null;

  return (
    <div className="space-y-4">
      {sports.map((sport) => (
        <div key={sport} className="border rounded-md p-4">
          <h3 className="font-medium mb-2 capitalize">{sport} Confidence</h3>
          <div className="flex gap-4 text-sm">
            <span>High: {summary[sport].High}</span>
            <span>Medium: {summary[sport].Medium}</span>
            <span>Low: {summary[sport].Low}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
