"use client"
import { marketClasses, Sport } from "@/features/markets/marketClasses"

interface MarketClassFilterProps {
  sport: Sport
  active: string | null
  onChange?: (value: string | null) => void
  hideAll?: boolean
}

export default function MarketClassFilter({
  sport,
  active,
  onChange,
  hideAll,
}: MarketClassFilterProps) {
  const classes = marketClasses[sport] || []

  const renderButton = (id: string, label: string) => (
    <span
      key={id}
      className={`px-2 py-1 rounded cursor-pointer ${
        active === id ? "bg-[#2b2c2d] text-white" : "border border-[#dcdddf]"
      }`}
      onClick={() => onChange?.(id)}
    >
      {label}
    </span>
  )

  return (
    <div className="flex flex-wrap gap-2 mb-4 text-sm">
      {!hideAll && renderButton("all", "All Markets")}
      {classes.map((c) => renderButton(c.id, c.label))}
    </div>
  )
}
