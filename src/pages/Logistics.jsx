import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faSimCard, faBolt, faTag, faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Logistics() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const transportOptions = [
    { title: 'Monthly Bus Pass', price: '55 PLN', desc: 'Valid for all city zones.' },
    { title: 'Prepaid SIM Card', price: '30 PLN', desc: '30GB data + unlimited calls.' },
  ];

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faBus} className="accent-text text-base" />
          Logistics
        </h1>
        <p className="section-subtitle">SIM cards and transport products for your first days in Lublin.</p>

        <div className="space-y-4">
          {transportOptions.map((opt, i) => (
            <article key={i} className="glass-panel p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="single-line inline-flex max-w-[210px] items-center gap-2 text-[1.2rem] font-semibold leading-tight tracking-tight text-white">
                    <FontAwesomeIcon icon={opt.title.includes('Bus') ? faBus : faSimCard} className="accent-text text-sm" />
                    {opt.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/72">{opt.desc}</p>
                </div>

                <span className="accent-chip inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  <FontAwesomeIcon icon={faBolt} className="text-[0.62rem]" />
                  instant
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="accent-text-strong inline-flex items-center gap-2 text-2xl font-bold tracking-tight">
                  <FontAwesomeIcon icon={faTag} className="text-sm" />
                  {opt.price}
                </span>
                <button className="primary-pill px-4 py-2 text-xs uppercase tracking-wider">
                  <span className="inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faCartShopping} />
                    Buy now
                  </span>
                </button>
              </div>

              <p className="mt-2 text-xs text-white/58">Demo checkout</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
