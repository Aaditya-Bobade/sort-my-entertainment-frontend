import ReservationTimer from "./ReservationTimer";

export default function BookingPanel({
  selectedSeats,
  reservation,
  bookingSuccess,
  error,
  loading,
  isAuthenticated,
  onReserve,
  onConfirm,
  onClearSelection,
  onLogin,
  onReservationExpire,
}) {
  if (bookingSuccess) {
    return (
      <aside className="sticky top-24 rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#171b31] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[rgba(45,212,168,0.18)] text-2xl font-semibold text-[#2dd4a8]">
          ✓
        </div>
        <h3 className="mb-3 text-2xl font-[Outfit]">Booking confirmed!</h3>
        <p className="mb-4 text-[rgba(255,255,255,0.75)]">
          Your seats are secured:
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {bookingSuccess.seatNumbers.map((seat) => (
            <span
              key={seat}
              className="rounded-full bg-[rgba(124,92,255,0.18)] px-3 py-1 text-sm font-semibold text-[#d9d0ff]"
            >
              {seat}
            </span>
          ))}
        </div>
        <p className="text-center text-[rgba(154,163,188,1)]">
          Enjoy the show!
        </p>
      </aside>
    );
  }

  return (
    <aside className="sticky top-24 rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#171b31] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <h3 className="mb-4 text-2xl font-[Outfit]">Your selection</h3>

      {selectedSeats.length === 0 && !reservation && (
        <p className="mb-4 text-[rgba(154,163,188,1)]">
          Pick available seats from the grid to get started.
        </p>
      )}

      {selectedSeats.length > 0 && !reservation && (
        <>
          <div className="mb-3 flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat}
                className="rounded-full bg-[rgba(124,92,255,0.18)] px-3 py-1 text-sm font-semibold text-[#d9d0ff]"
              >
                {seat}
              </span>
            ))}
          </div>
          <p className="mb-4 text-sm text-[rgba(154,163,188,1)]">
            {selectedSeats.length} seat(s) selected
          </p>
        </>
      )}

      {reservation && (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {reservation.seatNumbers.map((seat) => (
              <span
                key={seat}
                className="rounded-full bg-[rgba(255,200,87,0.18)] px-3 py-1 text-sm font-semibold text-[#ffd98a]"
              >
                {seat}
              </span>
            ))}
          </div>
          <ReservationTimer
            expiresAt={reservation.expiresAt}
            onExpire={onReservationExpire}
          />
        </>
      )}

      {error && <p className="mt-4 text-sm text-[#ff6b81]">{error}</p>}

      <div className="mt-6 flex flex-col gap-3">
        {!reservation && selectedSeats.length > 0 && (
          <>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                onClick={onClearSelection}
              >
                Clear
              </button>
              {isAuthenticated ? (
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-[#7c5cff] via-[#6f78ff] to-[#5b8cff] px-4 py-2 text-sm font-semibold text-white transition hover:from-[#9278ff] hover:to-[#6d9aff] disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={onReserve}
                  disabled={loading}
                >
                  {loading ? "Reserving..." : "Reserve seats"}
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-[#7c5cff] via-[#6f78ff] to-[#5b8cff] px-4 py-2 text-sm font-semibold text-white transition hover:from-[#9278ff] hover:to-[#6d9aff]"
                  onClick={onLogin}
                >
                  Log in to reserve
                </button>
              )}
            </div>
          </>
        )}

        {reservation && (
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-[#7c5cff] via-[#6f78ff] to-[#5b8cff] px-5 py-3 text-sm font-semibold text-white transition hover:from-[#9278ff] hover:to-[#6d9aff] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Confirming..." : "Confirm booking"}
          </button>
        )}
      </div>

      {!isAuthenticated && !reservation && (
        <p className="mt-4 text-sm text-[rgba(154,163,188,1)]">
          You must be logged in to reserve or book seats.
        </p>
      )}
    </aside>
  );
}
