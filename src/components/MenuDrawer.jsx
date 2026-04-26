import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBuilding,
  faHeartPulse,
  faFileLines,
  faCalendarDays,
  faBasketShopping,
  faBus,
  faComments,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function MenuDrawer({ open, close }) {
  const modules = [
    { to: '/dashboard', title: 'Main Dashboard', icon: faHouse },
    { to: '/housing', title: 'Housing', icon: faBuilding },
    { to: '/healthcare', title: 'Healthcare', icon: faHeartPulse },
    { to: '/bureaucracy', title: 'Bureaucracy', icon: faFileLines },
    { to: '/calendar', title: 'Social Calendar', icon: faCalendarDays },
    { to: '/necessities', title: 'Necessities', icon: faBasketShopping },
    { to: '/logistics', title: 'Logistics', icon: faBus },
    { to: '/chats', title: 'Chats', icon: faComments },
    { to: '/profile', title: 'Profile Settings', icon: faUser },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#050712]/70 backdrop-blur-sm transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs border-r border-white/15 bg-[#191330]/88 p-5 shadow-2xl backdrop-blur-2xl transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-6 mt-2">
          <p className="accent-text text-xs uppercase tracking-[0.25em]">CampUs</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">All Modules</h2>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {modules.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${
                  isActive
                    ? 'accent-chip text-white'
                    : 'border-white/10 bg-white/5 text-white/78 hover:bg-white/10'
                }`
              }
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/8">
                <FontAwesomeIcon icon={item.icon} className="text-sm" />
              </span>
              <span className="font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>

      </aside>
    </>
  );
}
