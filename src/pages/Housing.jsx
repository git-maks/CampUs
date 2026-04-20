import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import housingData from '../data/apartments.json';
import DualCurrency from '../components/DualCurrency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHouse, faUserGroup, faImage, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function Housing() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Standalone', 'Group', 'Roommate'];
  const roommateOption = {
    id: 'roommate-1',
    title: 'Roommate Match - City Center Flat',
    type: 'Roommate',
    price_pln: 1200,
    price_eur: 278,
    verified: true,
    description: 'Match with an Erasmus student sharing a 2-bedroom apartment close to LUT transit lines.',
  };
  const allListings = [...housingData, roommateOption];
  const filteredHousing = filter === 'All' ? allListings : allListings.filter((d) => d.type === filter);
  const housingTypeIcons = {
    Standalone: faHouse,
    Group: faUserGroup,
    Roommate: faUserGroup,
  };

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faBuilding} className="text-base text-blue-200" />
          Housing
        </h1>
        <p className="section-subtitle">Verified listings for apartments, groups, and roommate matching.</p>

        <div className="flex flex-wrap gap-2 pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === f
                  ? 'border-blue-200/50 bg-gradient-to-r from-[#6ea7ff] to-[#8f81ff] text-white'
                  : 'border-white/18 bg-white/8 text-white/80 hover:bg-white/13'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredHousing.map((apt) => (
            <article key={apt.id} className="glass-panel p-4">
              <div className="relative h-44 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/20 to-white/7">
                <div className="absolute -left-5 -top-6 h-28 w-28 rounded-full bg-[#94b7ff]/25 blur-2xl" />
                <div className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full bg-[#bea8ff]/24 blur-2xl" />
                <p className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/90">
                  <FontAwesomeIcon icon={housingTypeIcons[apt.type] || faBuilding} className="text-[0.6rem]" />
                  {apt.type} option
                </p>
                <p className="absolute bottom-3 left-3 inline-flex items-center gap-2 text-sm text-white/75">
                  <FontAwesomeIcon icon={faImage} className="text-xs" />
                  Preview
                </p>
              </div>

              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="single-line text-[1.35rem] font-semibold leading-tight tracking-tight text-white">{apt.title}</h3>
                  <p className="single-line mt-1 text-sm text-white/68">{apt.type}</p>
                </div>
                {apt.verified && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200/40 bg-emerald-200/17 px-2 py-1 text-xs font-semibold text-emerald-100">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-[0.62rem]" />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/78">{apt.description}</p>

              <div className="mt-4 border-t border-white/16 pt-4">
                <DualCurrency pln={apt.price_pln} eur={apt.price_eur} />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
