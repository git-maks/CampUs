import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import necessitiesData from '../data/necessities.json';
import { necessityLogoById } from '../data/assetMaps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
  faScissors,
  faMusic,
  faUtensils,
  faStore,
  faTag,
  faDumbbell,
  faPills,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';

export default function Necessities() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const typeAccent = {
    Grocery: 'from-[#ad015f]/36 to-[#ad015f]/10',
    Barber: 'from-[#c00f6c]/36 to-[#ad015f]/10',
    Club: 'from-[#d72583]/38 to-[#ad015f]/12',
    Restaurant: 'from-[#b20f66]/34 to-[#ad015f]/10',
    Fitness: 'from-[#cf1f78]/36 to-[#ad015f]/12',
    Pharmacy: 'from-[#bf166f]/34 to-[#ad015f]/12',
    Cafe: 'from-[#da2f85]/34 to-[#ad015f]/12',
  };
  const typeIcons = {
    Grocery: faBasketShopping,
    Barber: faScissors,
    Club: faMusic,
    Restaurant: faUtensils,
    Fitness: faDumbbell,
    Pharmacy: faPills,
    Cafe: faMugHot,
  };

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faBasketShopping} className="accent-text text-base" />
          Necessities
        </h1>
        <p className="section-subtitle">Groceries, clubs, barbers, and daily essentials around campus.</p>

        <div className="grid grid-cols-2 gap-4">
          {necessitiesData.map((item) => (
            <article key={item.id} className="glass-panel p-4">
              {necessityLogoById[item.id] ? (
                <div className="relative mb-3 h-20 overflow-hidden rounded-2xl border border-white/18 bg-white/6 p-2">
                  <img src={necessityLogoById[item.id]} alt={`${item.name} logo`} className="h-full w-full rounded-xl object-contain bg-white/80 p-1" loading="lazy" />
                </div>
              ) : null}

              <div
                className={`relative mb-3 flex h-16 items-center justify-center overflow-hidden rounded-2xl border border-white/18 bg-gradient-to-br ${typeAccent[item.type] || 'from-white/22 to-white/8'}`}
              >
                <div className="absolute -right-4 -top-4 h-10 w-10 rounded-full bg-white/25 blur-lg" />
                <span className="relative text-xl text-white">
                  <FontAwesomeIcon icon={typeIcons[item.type] || faStore} />
                </span>
              </div>

              <h3 className="single-line text-sm font-semibold leading-tight text-white">{item.name}</h3>
              <span className="accent-text single-line mt-1 text-[0.65rem] font-semibold uppercase tracking-wider">{item.type}</span>
              <p className="accent-chip-soft single-line mt-2 inline-flex max-w-full items-center gap-1 rounded-full px-2 py-1 text-xs font-medium">
                <FontAwesomeIcon icon={faTag} className="text-[0.62rem]" />
                {item.discount}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
