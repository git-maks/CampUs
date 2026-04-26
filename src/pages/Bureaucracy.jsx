import React, { useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import { bureaucracyGuideImageByKey } from '../data/assetMaps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines,
  faBuilding,
  faUserCheck,
  faArrowRight,
  faPassport,
  faShieldHalved,
  faIdCard,
  faBriefcase,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

export default function Bureaucracy() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const guides = [
    { key: 'pesel', title: 'Register Residence (PESEL)', icon: faFileLines, desc: 'How to register your temporary address in Poland.' },
    { key: 'bank', title: 'Bank Account Setup', icon: faBuilding, desc: 'Top student accounts with zero fees and dual currencies.' },
    { key: 'studentCard', title: 'Student ID Card System', icon: faUserCheck, desc: 'Access 50% transport discounts with your student card.' },
    { key: 'permit', title: 'Temporary Residence Permit', icon: faPassport, desc: 'Checklist for permit submission, fees, and office appointments.' },
    { key: 'nfz', title: 'NFZ Health Registration', icon: faShieldHalved, desc: 'How to activate public healthcare eligibility during studies.' },
    { key: 'address', title: 'Address Confirmation Letter', icon: faHouse, desc: 'Template and requirements for landlord signed residency confirmations.' },
    { key: 'tax', title: 'Tax ID and Work Rules', icon: faIdCard, desc: 'Essential tax and legal basics before part-time student employment.' },
    { key: 'internship', title: 'Internship Documentation', icon: faBriefcase, desc: 'University paperwork needed for Erasmus internship recognition.' },
  ];

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faFileLines} className="accent-text text-base" />
          Bureaucracy
        </h1>
        <p className="section-subtitle">Guides and mock forms to simplify first-week administration.</p>

        <div className="grid gap-4">
          {guides.map((guide, i) => (
            <article key={i} className="glass-panel group relative overflow-hidden p-5">
              <div className="absolute -right-5 -top-4 h-20 w-20 rounded-full bg-white/18 blur-2xl transition group-hover:scale-110" />

              {bureaucracyGuideImageByKey[guide.key] ? (
                <div className="relative mb-4 h-32 overflow-hidden rounded-2xl border border-white/16">
                  <img src={bureaucracyGuideImageByKey[guide.key]} alt={`${guide.title} illustration`} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1020]/72 to-transparent" />
                </div>
              ) : null}

              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/85">
                  <FontAwesomeIcon icon={guide.icon} className="text-sm" />
                </div>
                <h3 className="text-[1.2rem] font-semibold leading-tight tracking-tight text-white">{guide.title}</h3>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-white/72">{guide.desc}</p>

              <button className="ghost-pill mt-4 px-4 py-2 text-sm">
                <span className="inline-flex items-center gap-2">
                  Read Guide
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </span>
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
