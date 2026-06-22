import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header({ onLoginClick, onRegisterClick }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[rgba(11,13,23,0.82)] border-b border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] flex flex-wrap items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-2xl">🎭</span>
          <div>
            <strong className="block font-[Outfit] text-base">
              Sort my Entertainment
            </strong>
            <small className="text-[rgba(154,163,188,1)] text-xs">
              Book unforgettable moments
            </small>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="rounded-full bg-[rgba(124,92,255,0.15)] px-3 py-1 text-sm font-semibold text-[#d9d0ff]">
                Hi, {user.userName}
              </span>
              <button
                type="button"
                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-4 py-2 text-sm font-semibold transition duration-150 hover:-translate-y-0.5"
                onClick={logout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-transparent px-4 py-2 text-sm font-semibold transition duration-150 hover:-translate-y-0.5"
                onClick={onLoginClick}
              >
                Log in
              </button>
              <button
                type="button"
                className="rounded-full bg-gradient-to-r from-[#7c5cff] via-[#6f78ff] to-[#5b8cff] px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:from-[#9278ff] hover:to-[#6d9aff]"
                onClick={onRegisterClick}
              >
                Sign up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
