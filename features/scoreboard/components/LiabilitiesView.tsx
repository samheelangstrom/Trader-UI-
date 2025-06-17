"use client"

import type { LiabilityData } from "../types"

interface LiabilitiesViewProps {
  data: LiabilityData
}

export function LiabilitiesView({ data }: LiabilitiesViewProps) {
  return (
    <div className="bg-white border border-[#dcdddf] rounded-md p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Liabilities and Stake Factor</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#dcdddf] rounded-md p-4">
          <h4 className="font-medium mb-2">Market Liabilities</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Moneyline</span>
              <span>{data.marketLiabilities.moneyline}</span>
            </div>
            <div className="flex justify-between">
              <span>Spread</span>
              <span>{data.marketLiabilities.spread}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Points</span>
              <span>{data.marketLiabilities.totalPoints}</span>
            </div>
            <div className="flex justify-between">
              <span>Player Props</span>
              <span>{data.marketLiabilities.playerProps}</span>
            </div>
          </div>
        </div>

        <div className="border border-[#dcdddf] rounded-md p-4">
          <h4 className="font-medium mb-2">Stake Factors</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Lakers Win</span>
              <span className="text-[#eb6a2e]">{data.stakeFactors.lakersWin}</span>
            </div>
            <div className="flex justify-between">
              <span>Celtics Win</span>
              <span>{data.stakeFactors.celticsWin}</span>
            </div>
            <div className="flex justify-between">
              <span>Over 200.5</span>
              <span className="text-[#eb6a2e]">{data.stakeFactors.over}</span>
            </div>
            <div className="flex justify-between">
              <span>Under 200.5</span>
              <span>{data.stakeFactors.under}</span>
            </div>
          </div>
        </div>

        <div className="border border-[#dcdddf] rounded-md p-4 col-span-2">
          <h4 className="font-medium mb-2">Risk Assessment</h4>
          <div className="flex items-center mb-2">
            <div className="w-full bg-[#f1f2f3] rounded-full h-2.5">
              <div
                className="bg-[#eb6a2e] h-2.5 rounded-full"
                style={{ width: `${data.riskAssessment.percentage}%` }}
              ></div>
            </div>
            <span className="ml-2">{data.riskAssessment.percentage}%</span>
          </div>
          <p className="text-sm text-[#5f6368]">
            Current risk level is {data.riskAssessment.level}. {data.riskAssessment.recommendation}
          </p>
        </div>
      </div>
    </div>
  )
}
