import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import necessitiesData from '../data/necessities.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faScissors, faMusic, faUtensils, faStore, faTag } from '@fortawesome/free-solid-svg-icons';

export default function Necessities() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const typeAccent = {
    Grocery: 'from-emerald-300/35 to-emerald-200/8',
    Barber: 'from-blue-300/35 to-blue-200/8',
    Club: 'from-fuchsia-300/35 to-fuchsia-200/8',
    Restaurant: 'from-amber-300/35 to-amber-200/8',
  };
  const typeIcons = {
    Grocery: faBasketShopping,
    Barber: faScissors,
    Club: faMusic,
    Restaurant: faUtensils,
  };

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faBasketShopping} className="text-base text-blue-200" />
          Necessities
        </h1>
        <p className="section-subtitle">Groceries, clubs, barbers, and daily essentials around campus.</p>

        <div className="grid grid-cols-2 gap-4">
          {necessitiesData.map((item) => (
            <article key={item.id} className="glass-panel p-4">
              <div
                className={`relative mb-3 flex h-16 items-center justify-center overflow-hidden rounded-2xl border border-white/18 bg-gradient-to-br ${typeAccent[item.type] || 'from-white/22 to-white/8'}`}
              >
                <div className="absolute -right-4 -top-4 h-10 w-10 rounded-full bg-white/25 blur-lg" />
                <span className="relative text-xl text-white">
                  <FontAwesomeIcon icon={typeIcons[item.type] || faStore} />
                </span>
              </div>

              <h3 className="single-line text-sm font-semibold leading-tight text-white">{item.name}</h3>
              <span className="single-line mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-blue-200">{item.type}</span>
              <p className="single-line mt-2 inline-flex max-w-full items-center gap-1 rounded-full border border-emerald-200/35 bg-emerald-200/15 px-2 py-1 text-xs font-medium text-emerald-100">
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
