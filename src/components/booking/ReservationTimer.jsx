import { useEffect, useState } from "react";

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function ReservationTimer({ expiresAt, onExpire }) {
  const [remaining, setRemaining] = useState(
    () => new Date(expiresAt) - Date.now(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const next = new Date(expiresAt) - Date.now();
      setRemaining(next);
      if (next <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const isUrgent = remaining <= 60 * 1000;

  return (
    <div
      className={`mt-4 rounded-[10px] border px-4 py-3 text-center ${isUrgent ? "border-[rgba(255,107,129,0.35)] bg-[rgba(255,107,129,0.12)]" : "border-[rgba(255,200,87,0.25)] bg-[rgba(255,200,87,0.1)]"}`}
    >
      <span className="block text-sm text-[rgba(154,163,188,1)]">
        Reservation expires in
      </span>
      <strong
        className={`mt-1 block text-2xl font-[Outfit] ${isUrgent ? "text-[#ff6b81]" : "text-[#ffc857]"}`}
      >
        {formatTime(remaining)}
      </strong>
    </div>
  );
}
