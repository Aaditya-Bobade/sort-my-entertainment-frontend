import { Link } from "react-router-dom";

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const CARD_GRADIENTS = [
  "from-[#2a1f5e] to-[#171b31]",
  "from-[#1f3d5e] to-[#171b31]",
  "from-[#3d1f4a] to-[#171b31]",
  "from-[#1f4a3d] to-[#171b31]",
  "from-[#4a331f] to-[#171b31]",
];

export default function EventCard({ event, index = 0 }) {
  return (
    <article
      className={`flex min-h-[320px] flex-col justify-between gap-5 rounded-[16px] border border-[rgba(255,255,255,0.1)] bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]`}
    >
      <div className="space-y-4">
        <span className="inline-flex rounded-full bg-[rgba(255,255,255,0.12)] px-3 py-1 text-sm">
          {event.totalSeats} seats
        </span>
        <h3 className="text-2xl font-[Outfit]">{event.name}</h3>
        <p className="text-[rgba(255,255,255,0.78)] text-sm leading-6 line-clamp-3">
          {event.description || "An unforgettable live experience."}
        </p>
        <ul className="grid gap-2 text-[rgba(255,255,255,0.85)] text-sm">
          <li className="flex items-start gap-2">
            <span>📅</span> {formatDate(event.dateTime)}
          </li>
          <li className="flex items-start gap-2">
            <span>📍</span> {event.venue}
          </li>
        </ul>
      </div>
      <Link
        to={`/events/${event._id}`}
        className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.12)] px-5 py-3 text-sm text-white transition hover:-translate-y-0.5"
      >
        View seats →
      </Link>
    </article>
  );
}
