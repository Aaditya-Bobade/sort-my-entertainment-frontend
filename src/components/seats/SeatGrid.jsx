export default function SeatGrid({
  seats,
  selectedSeats,
  onToggleSeat,
  disabled,
}) {
  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const sortedRows = Object.keys(rows).sort();

  return (
    <div className="overflow-x-auto">
      <div className="mx-auto min-w-[360px] space-y-4">
        <div className="mx-auto max-w-[420px] rounded-[10px] bg-gradient-to-b from-[#7c5cff]/20 to-transparent px-4 py-2 text-center text-xs uppercase tracking-[0.18em] text-[#d9d0ff]">
          STAGE / SCREEN
        </div>
        {sortedRows.map((row) => (
          <div key={row} className="flex flex-wrap items-center gap-3">
            <span className="w-5 text-sm font-semibold text-[rgba(154,163,188,1)]">
              {row}
            </span>
            <div className="flex flex-wrap gap-2">
              {rows[row]
                .sort(
                  (a, b) =>
                    parseInt(a.seatNumber.slice(1), 10) -
                    parseInt(b.seatNumber.slice(1), 10),
                )
                .map((seat) => {
                  const isSelected = selectedSeats.includes(seat.seatNumber);
                  const isAvailable = seat.status === "available";
                  const statusClasses = isSelected
                    ? "bg-gradient-to-br from-[#7c5cff] to-[#5b8cff] text-white shadow-[0_0_0_2px_rgba(124,92,255,0.35)]"
                    : seat.status === "available"
                      ? "bg-[rgba(45,212,168,0.18)] text-[#8ef0d3] border border-[rgba(45,212,168,0.35)]"
                      : seat.status === "reserved"
                        ? "bg-[rgba(255,200,87,0.18)] text-[#ffd98a] border border-[rgba(255,200,87,0.35)]"
                        : "bg-[rgba(255,107,129,0.18)] text-[#ff9aab] border border-[rgba(255,107,129,0.35)] cursor-not-allowed";

                  return (
                    <button
                      key={seat._id}
                      type="button"
                      className={`h-11 w-11 rounded-[10px_10px_4px_4px] text-xs font-bold transition duration-150 ${statusClasses} ${!isAvailable && !isSelected ? "opacity-70" : "hover:scale-[1.06]"}`}
                      disabled={!isAvailable && !isSelected}
                      onClick={() => onToggleSeat(seat)}
                      title={`Seat ${seat.seatNumber} — ${seat.status}`}
                      aria-label={`Seat ${seat.seatNumber}, ${seat.status}`}
                      aria-pressed={isSelected}
                    >
                      {seat.seatNumber.replace(row, "")}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
