import { useMemo, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingApi, eventsApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import BookingPanel from "../components/booking/BookingPanel";
import SeatGrid from "../components/seats/SeatGrid";
import SeatLegend from "../components/seats/SeatLegend";
import Spinner from "../components/ui/Spinner";
import Alert from "../components/ui/Alert";

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventDetailPage() {
  const { id } = useParams();
  const { openLogin } = useOutletContext();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [panelError, setPanelError] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => eventsApi.getById(id),
    retry: 1,
    refetchInterval: 15000,
  });

  const event = data?.data.event || null;
  const seats = data?.data.seats || [];
  const availability = data?.data.availability || null;

  const eventError = error?.message ?? "Failed to load event.";

  const toggleSeat = (seat) => {
    if (reservation || seat.status !== "available") return;

    setSelectedSeats((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber],
    );
    setPanelError("");
  };

  const reserveMutation = useMutation({
    mutationFn: (variables) => bookingApi.reserve(variables),
    onSuccess: (response) => {
      setReservation(response.reservation);
      setSelectedSeats([]);
      queryClient.invalidateQueries(["event", id]);
    },
    onError: (err) => {
      const unavailable = err.data?.unavailableSeats?.join(", ");
      setPanelError(
        unavailable
          ? `${err.message}: ${unavailable}`
          : err.message || "Failed to reserve seats",
      );
      queryClient.invalidateQueries(["event", id]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["event", id]);
    },
  });

  const confirmMutation = useMutation({
    mutationFn: (variables) => bookingApi.confirm(variables),
    onSuccess: (response) => {
      setBookingSuccess(response.booking);
      setReservation(null);
      queryClient.invalidateQueries(["event", id]);
    },
    onError: (err) => {
      setPanelError(err.message || "Booking failed");
      if (err.status === 410) {
        setReservation(null);
        queryClient.invalidateQueries(["event", id]);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["event", id]);
    },
  });

  const handleReservationExpire = () => {
    setReservation(null);
    setPanelError("Your reservation expired. Please select seats again.");
    queryClient.invalidateQueries(["event", id]);
  };

  const isActionLoading =
    reserveMutation.isLoading || confirmMutation.isLoading;

  if (isLoading) {
    return (
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] py-12">
        <Spinner label="Loading event..." />
      </div>
    );
  }

  if (!event || isError) {
    return (
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] py-12">
        <Alert message={isError ? eventError : "Event not found"} />
        <Link
          to="/"
          className="inline-flex rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
        >
          ← Back to events
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[min(1200px,calc(100%-2rem))] py-8">
      <Link
        to="/"
        className="mb-6 inline-block text-[rgba(154,163,188,1)] transition hover:text-white"
      >
        ← All events
      </Link>

      <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb347]">
            {event.venue}
          </p>
          <h1 className="text-4xl font-[Outfit] leading-tight sm:text-5xl">
            {event.name}
          </h1>
          <p className="text-sm font-semibold text-[#ffb347]">
            {formatDate(event.dateTime)}
          </p>
          {event.description && (
            <p className="text-[rgba(255,255,255,0.75)]">{event.description}</p>
          )}
        </div>

        {availability && (
          <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-auto">
            <div className="rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#121528] p-4 text-center">
              <strong className="block text-2xl font-[Outfit]">
                {availability.available}
              </strong>
              <span className="text-sm text-[rgba(154,163,188,1)]">
                Available
              </span>
            </div>
            <div className="rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#121528] p-4 text-center">
              <strong className="block text-2xl font-[Outfit]">
                {availability.reserved}
              </strong>
              <span className="text-sm text-[rgba(154,163,188,1)]">
                Reserved
              </span>
            </div>
            <div className="rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#121528] p-4 text-center">
              <strong className="block text-2xl font-[Outfit]">
                {availability.booked}
              </strong>
              <span className="text-sm text-[rgba(154,163,188,1)]">Booked</span>
            </div>
          </div>
        )}
      </header>

      <Alert message={panelError} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <section className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#121528] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-[Outfit]">Select your seats</h2>
            <SeatLegend />
          </div>
          <SeatGrid
            seats={seats}
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
            disabled={Boolean(reservation) || Boolean(bookingSuccess)}
          />
        </section>

        <BookingPanel
          selectedSeats={selectedSeats}
          reservation={reservation}
          bookingSuccess={bookingSuccess}
          error={panelError}
          loading={isActionLoading}
          isAuthenticated={isAuthenticated}
          onReserve={() =>
            reserveMutation.mutate({ eventId: id, seatNumbers: selectedSeats })
          }
          onConfirm={() =>
            confirmMutation.mutate({ reservationId: reservation?._id })
          }
          onClearSelection={() => setSelectedSeats([])}
          onLogin={openLogin}
          onReservationExpire={handleReservationExpire}
        />
      </div>
    </div>
  );
}
