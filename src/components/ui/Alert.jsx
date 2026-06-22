export default function Alert({ type = "error", message, onClose }) {
  if (!message) return null;

  const baseStyles =
    "mb-4 flex items-center justify-between gap-4 rounded-[10px] px-4 py-3 text-sm";
  const typeStyles =
    type === "success"
      ? "bg-[rgba(45,212,168,0.12)] border border-[rgba(45,212,168,0.35)] text-[#8ef0d3]"
      : "bg-[rgba(255,107,129,0.12)] border border-[rgba(255,107,129,0.35)] text-[#ffb3c0]";

  return (
    <div className={`${baseStyles} ${typeStyles}`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className="text-lg text-current"
          onClick={onClose}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}
