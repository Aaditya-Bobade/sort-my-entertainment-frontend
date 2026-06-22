const LEGEND = [
  {
    status: "available",
    label: "Available",
    classes: "bg-[rgba(45,212,168,0.55)]",
  },
  { status: "selected", label: "Selected", classes: "bg-[#7c5cff]" },
  {
    status: "reserved",
    label: "Reserved",
    classes: "bg-[rgba(255,200,87,0.65)]",
  },
  { status: "booked", label: "Booked", classes: "bg-[rgba(255,107,129,0.65)]" },
];

export default function SeatLegend() {
  return (
    <div className="flex flex-wrap gap-3">
      {LEGEND.map((item) => (
        <div
          key={item.status}
          className="flex items-center gap-2 text-sm text-[rgba(154,163,188,1)]"
        >
          <span
            className={`inline-block h-3.5 w-3.5 rounded-sm ${item.classes}`}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
