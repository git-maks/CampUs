import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header({ toggleMenu }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 px-4 pt-4">
      <div className="glass-panel flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Open navigation menu"
          className="h-11 w-11 rounded-2xl border border-white/20 bg-white/10 text-white/90 transition hover:bg-white/20 active:scale-[0.98]"
        >
          <FontAwesomeIcon icon={faBars} className="text-base" />
        </button>

        <h1 className="text-[1.9rem] font-semibold leading-none tracking-tight">
          <span className="accent-title-gradient">CampUs</span>
        </h1>

        <button
          type="button"
          onClick={() => navigate('/profile')}
          aria-label="Open profile settings"
          className="accent-icon-wrap flex h-11 w-11 items-center justify-center rounded-2xl transition hover:brightness-110 active:scale-[0.98]"
        >
          <FontAwesomeIcon icon={faUser} className="text-base" />
        </button>
      </div>
    </header>
  );
}
