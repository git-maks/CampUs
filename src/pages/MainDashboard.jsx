import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import CustomScrollbar from '../components/CustomScrollbar';
import CampusMap from '../components/CampusMap';
import necessitiesDocs from '../data/necessities.json';
import calendarDocs from '../data/calendar.json';
import userProfile from '../data/user-profile.json';
import { necessityLogoById, necessityPromoById } from '../data/assetMaps';
import zabkaBarcode from '../assets/images/store-and-vendors-assets/zabka-barcode.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTicket,
  faBasketShopping,
  faStore,
  faTag,
  faMusic,
  faScissors,
  faUtensils,
  faDumbbell,
  faPills,
  faMugHot,
  faLink,
  faClock,
  faCircleCheck,
  faCoins,
  faCalendarDays,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

export default function MainDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const vendorTypeIcons = {
    Grocery: faBasketShopping,
    Restaurant: faUtensils,
    Barber: faScissors,
    Club: faMusic,
    Fitness: faDumbbell,
    Pharmacy: faPills,
    Cafe: faMugHot,
  };
  const topCoupons = necessitiesDocs.slice(0, 3);
  const topEvents = calendarDocs.slice(0, 3);

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-5">
        <CampusMap />

        <section className="glass-panel p-4">
          <p className="text-sm text-white/70">Hey {userProfile.name}</p>
          <h2 className="section-title flex items-center gap-2">
            <FontAwesomeIcon icon={faTicket} className="accent-text text-base" />
            Best Coupons
          </h2>

          <div className="mt-3">
            <CustomScrollbar orientation="horizontal" contentClassName="flex gap-3 pr-6 snap-x snap-mandatory">
              {topCoupons.map((vendor) => (
                <article key={vendor.id} className="min-w-[220px] max-w-[220px] snap-start rounded-2xl border border-white/15 bg-white/5 p-3">
                  <div className="relative mb-3 h-24 overflow-hidden rounded-2xl border border-white/14 bg-gradient-to-br from-[#ad015f]/34 to-[#ad015f]/10">
                    {necessityPromoById[vendor.id] || necessityLogoById[vendor.id] ? (
                      <img
                        src={necessityPromoById[vendor.id] || necessityLogoById[vendor.id]}
                        alt={`${vendor.name} promotion`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/35 bg-white/15 text-sm font-bold text-white">
                          <FontAwesomeIcon icon={vendorTypeIcons[vendor.type] || faStore} className="text-base" />
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1020]/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 pb-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/35 bg-white/15 text-sm font-bold text-white">
                        <FontAwesomeIcon icon={vendorTypeIcons[vendor.type] || faStore} className="text-base" />
                      </span>
                      <span className="single-line inline-flex max-w-[128px] items-center gap-1 text-xs font-semibold uppercase tracking-wide text-white/85">
                        <FontAwesomeIcon icon={faTag} className="text-[0.65rem]" />
                        {vendor.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="single-line text-lg font-semibold tracking-tight text-white">{vendor.name}</h3>
                  <p className="accent-text single-line mt-1 text-sm font-medium">{vendor.discount}</p>
                </article>
              ))}
            </CustomScrollbar>
          </div>
        </section>

        <section className="glass-panel p-4">
          <h2 className="section-title flex items-center gap-2">
            <FontAwesomeIcon icon={faLink} className="accent-text text-base" />
            Vendor Wallet
          </h2>

          <div className="accent-border rounded-2xl border bg-[rgba(173,1,95,0.18)] p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="accent-text-strong single-line text-[1.9rem] font-semibold tracking-tight">Zabka Connected</p>
                <p className="accent-text inline-flex items-center gap-1 text-sm">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[0.7rem]" />
                  Verified
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="accent-text-strong text-3xl font-bold leading-none">450</p>
                <p className="accent-text single-line inline-flex items-center gap-1 text-xs uppercase tracking-wider">
                  <FontAwesomeIcon icon={faCoins} className="text-[0.65rem]" />
                  Points
                </p>
              </div>
            </div>

            {zabkaBarcode ? (
              <div className="mt-3 h-14 overflow-hidden rounded-xl border border-white/20 bg-white p-0">
                <img src={zabkaBarcode} alt="Zabka wallet barcode" className="block h-full w-full object-fill" loading="lazy" />
              </div>
            ) : null}
          </div>
        </section>

        <section>
          <h2 className="section-title flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} className="accent-text text-base" />
            Community Calendar
          </h2>

          <div className="space-y-3">
            {topEvents.map((event) => (
              <article key={event.id} className="glass-panel p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="accent-text inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
                    <FontAwesomeIcon icon={faCalendarDays} className="text-[0.65rem]" />
                    {event.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-white/65">
                    <FontAwesomeIcon icon={faClock} className="text-[0.65rem]" />
                    {new Date(event.date).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-white">{event.title}</h3>
                <p className="single-line mt-1 inline-flex items-center gap-2 text-sm text-white/75">
                  <FontAwesomeIcon icon={faLocationDot} className="accent-text text-xs" />
                  {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} at {event.location}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
