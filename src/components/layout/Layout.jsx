import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

export default function Layout() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={openLogin} onRegisterClick={openRegister} />
      <main className="flex-1">
        <Outlet context={{ openLogin, openRegister }} />
      </main>
      <footer className="border-t border-[rgba(255,255,255,0.08)] py-6">
        <div className="mx-auto w-[min(1200px,calc(100%-2rem))] text-[rgba(154,163,188,1)] text-sm">
          <p>
            © {new Date().getFullYear()} Sort my Entertainment. All rights
            reserved.
          </p>
        </div>
      </footer>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={openRegister}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={openLogin}
      />
    </div>
  );
}
