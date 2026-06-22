import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "../api/client";
import EventList from "../components/events/EventList";
import Spinner from "../components/ui/Spinner";
import Alert from "../components/ui/Alert";

export default function HomePage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: eventsApi.getAll,
  });

  const events = data?.events ?? [];

  return (
    <div className="mx-auto w-[min(1200px,calc(100%-2rem))] py-8">
      <section className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb347]">
          Live events · Concerts · Comedy · More
        </p>
        <h1 className="max-w-[14ch] text-4xl font-[Outfit] leading-tight sm:text-5xl">
          Find your next unforgettable night
        </h1>
        <p className="max-w-[56ch] text-[rgba(255,255,255,0.75)] text-base">
          Browse upcoming events, check real-time seat availability, and secure
          your spot in minutes.
        </p>
      </section>

      {isError && (
        <Alert message={error?.message || "Failed to load events."} />
      )}

      {isLoading ? (
        <Spinner label="Loading events..." />
      ) : events.length === 0 ? (
        <p className="py-12 text-center text-[rgba(154,163,188,1)]">
          No events available right now. Check back soon!
        </p>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
}
