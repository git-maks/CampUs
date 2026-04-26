import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import doctorsData from '../data/doctors.json';
import { doctorImageById } from '../data/assetMaps';
import { getDoctorThreadId } from '../data/chats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartPulse,
  faTriangleExclamation,
  faPhone,
  faStethoscope,
  faGlobe,
  faComments,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

export default function Healthcare() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

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
              {doctorImageById[doc.id] ? (
                <div className="relative mb-4 h-44 overflow-hidden rounded-2xl border border-white/16">
                  <img src={doctorImageById[doc.id]} alt={`${doc.name} portrait`} className="h-full w-full object-cover object-top" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d1020]/80 to-transparent" />
                </div>
              ) : null}

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/16 text-white backdrop-blur-xl">
                  <FontAwesomeIcon icon={faStethoscope} className="text-sm" />
                </div>

                <div className="flex min-w-0 flex-col">
                  <h3 className="single-line text-xl font-semibold tracking-tight text-white">{doc.name}</h3>
                  <p className="single-line accent-text text-sm">{doc.specialty}</p>
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
                <button
                  type="button"
                  onClick={() => navigate(`/chats?thread=${encodeURIComponent(getDoctorThreadId(doc.id))}`)}
                  className="ghost-pill py-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faComments} />
                    Chat & Book Visit
                  </span>
                </button>
                <button type="button" className="primary-pill py-2">
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
