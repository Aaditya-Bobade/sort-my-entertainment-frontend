export default function Spinner({ label = "Loading..." }) {
  return (
    <div
      className="flex flex-col items-center gap-3 py-12 text-[rgba(154,163,188,1)]"
      role="status"
      aria-live="polite"
    >
      <div className="h-11 w-11 rounded-full border-3 border-[rgba(124,92,255,0.2)] border-t-[#7c5cff] animate-spin" />
      <span>{label}</span>
    </div>
  );
}
