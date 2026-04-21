import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import doctorsData from '../data/doctors.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartPulse,
  faTriangleExclamation,
  faPhone,
  faStethoscope,
  faGlobe,
  faCalendarDays,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

export default function Healthcare() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faHeartPulse} className="accent-text text-base" />
          Healthcare
        </h1>
        <p className="section-subtitle">English-friendly doctors and nearby clinics for Erasmus students.</p>

        <article className="glass-panel p-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/65">
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-[0.7rem] text-amber-200" />
            Emergency
          </p>
          <p className="mt-1 inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-white">
            <FontAwesomeIcon icon={faPhone} className="accent-text text-lg" />
            Call 112 for urgent help
          </p>
        </article>

        <div className="space-y-4">
          {doctorsData.map((doc) => (
            <article key={doc.id} className="glass-panel p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/16 text-xl font-bold text-white backdrop-blur-xl">
                  <FontAwesomeIcon icon={faStethoscope} className="text-xl" />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold tracking-tight text-white">{doc.name}</h3>
                  <p className="accent-text text-sm">{doc.specialty}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {doc.languages.map((lang) => (
                  <span key={lang} className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                    <FontAwesomeIcon icon={faGlobe} className="text-[0.62rem]" />
                    {lang}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <button className="ghost-pill py-2">
                  <span className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    Book Demo Visit
                  </span>
                </button>
                <button className="primary-pill py-2">
                  <span className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} />
                    Open Directions
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
