import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import calendarData from '../data/calendar.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock, faLocationDot, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function SocialCalendar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarDays} className="accent-text text-base" />
          Social Calendar
        </h1>
        <p className="section-subtitle">Upcoming student events, parties, and community meetups.</p>

        <div className="space-y-4">
          {calendarData.map((event) => (
            <article key={event.id} className="glass-panel relative overflow-hidden p-5">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />

              <div className="mb-2 flex items-start justify-between">
                <span className="accent-chip inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-[0.65rem]" />
                  {event.type}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-white/65">
                  <FontAwesomeIcon icon={faClock} className="text-[0.62rem]" />
                  {new Date(event.date).toLocaleDateString('en-GB')}
                </span>
              </div>

              <h3 className="single-line text-xl font-semibold tracking-tight text-white">{event.title}</h3>
              <div className="mt-2 space-y-1 text-sm text-white/78">
                <p className="single-line inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="accent-text text-xs" />
                  {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="single-line inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faLocationDot} className="accent-text text-xs" />
                  {event.location}
                </p>
              </div>

              <button className="primary-pill mt-4 w-full py-2 text-sm">
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  I'm going!
                </span>
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
