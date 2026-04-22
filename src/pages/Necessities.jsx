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
                <div
                  className={`relative mb-3 aspect-[5/4] w-full overflow-hidden rounded-2xl border border-white/18 p-2 ${
                    item.id === 13 || item.id === 14 ? 'bg-[#030303]' : 'bg-white'
                  }`}
                >
                  <img
                    src={necessityLogoById[item.id]}
                    alt={`${item.name} logo`}
                    className={`h-full w-full rounded-xl object-contain p-1 ${item.id === 13 || item.id === 14 ? 'bg-transparent' : 'bg-white'}`}
                    loading="lazy"
                  />
                </div>
              ) : null}

              <h3 className="single-line inline-flex max-w-full items-center gap-1.5 text-sm font-semibold leading-tight text-white">
                <FontAwesomeIcon icon={typeIcons[item.type] || faStore} className="accent-text text-[0.62rem]" />
                {item.name}
              </h3>
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
