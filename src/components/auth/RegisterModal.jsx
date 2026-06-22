import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Alert from "../ui/Alert";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(form);
      setSuccess("Account created! You can log in now.");
      setForm({ userName: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#171b31] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="absolute right-4 top-4 text-2xl text-[rgba(154,163,188,1)] transition hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-3xl font-[Outfit]">Create account</h2>
        <p className="mt-2 text-[rgba(154,163,188,1)]">
          Join Sort my Entertainment to book events
        </p>

        <Alert message={error} onClose={() => setError("")} />
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess("")}
        />

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-[rgba(154,163,188,1)]">
            Name
            <input
              className="rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#121528] px-4 py-3 text-white outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#7c5cff]/60"
              type="text"
              required
              minLength={3}
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm text-[rgba(154,163,188,1)]">
            Email
            <input
              className="rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#121528] px-4 py-3 text-white outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#7c5cff]/60"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm text-[rgba(154,163,188,1)]">
            Password
            <input
              className="rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#121528] px-4 py-3 text-white outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#7c5cff]/60"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-[#7c5cff] via-[#6f78ff] to-[#5b8cff] px-6 py-3 text-sm font-semibold text-white transition hover:from-[#9278ff] hover:to-[#6d9aff] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[rgba(154,163,188,1)]">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-[#ffb347]"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
