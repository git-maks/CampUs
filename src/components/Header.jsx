import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header({ toggleMenu }) {
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
          <span className="bg-gradient-to-r from-[#9ec2ff] to-[#d0b8ff] bg-clip-text text-transparent">CampUs</span>
        </h1>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-200/30 bg-blue-200/25 text-blue-100">
          <FontAwesomeIcon icon={faUser} className="text-base" />
        </div>
      </div>
    </header>
  );
}
