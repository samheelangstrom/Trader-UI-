"use client"

type AlertsViewProps = {}

export function AlertsView({}: AlertsViewProps) {
  return (
    <div className="bg-white border border-[#dcdddf] rounded-md p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Alerts</h3>
      <div className="text-center text-[#5f6368] py-8">
        <p>Alerts functionality would be displayed here.</p>
        <p className="text-sm mt-2">This can be integrated with the alerts feature module.</p>
      </div>
    </div>
  )
}
