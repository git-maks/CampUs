import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLanguage, faCoins, faRightToBracket, faForward } from '@fortawesome/free-solid-svg-icons';
import userProfile from '../data/user-profile.json';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState(userProfile.name);
  const [surname, setSurname] = useState(userProfile.surname);
  const [language, setLanguage] = useState(userProfile.language || 'en');
  const [currency, setCurrency] = useState(userProfile.currency_default || 'PLN');
  const [secondaryCurrency, setSecondaryCurrency] = useState(userProfile.currency_secondary || 'EUR');

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="app-shell px-4 py-8">
      <div className="flex min-h-[86vh] flex-col justify-center gap-5">
        <section className="glass-panel p-6">
          <p className="accent-text text-xs uppercase tracking-[0.3em]">CampUs PWA</p>
          <h1 className="mt-2 text-[2.1rem] font-semibold leading-tight tracking-tight text-white">
            Move to Poland with confidence.
          </h1>
          <p className="mt-3 text-sm text-white/75">
            Onboarding, coupons, housing, logistics, and student essentials in one mobile-first app.
          </p>

          <div className="mt-4 rounded-2xl border border-white/20 bg-white/8 px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Dual currency mode</span>
              <span className="accent-chip-soft rounded-full px-3 py-1 text-xs font-semibold">
                {currency} + {secondaryCurrency}
              </span>
            </div>
          </div>
        </section>

        <form
          className="glass-panel space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSkip();
          }}
        >
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
              <FontAwesomeIcon icon={faUser} className="text-xs" /> Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
              className="frosted-input"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
              <FontAwesomeIcon icon={faUser} className="text-xs" /> Surname
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Your surname"
              className="frosted-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
                <FontAwesomeIcon icon={faLanguage} className="text-xs" /> Language
              </label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="frosted-input">
                <option value="en">English</option>
                <option value="pl">Polish</option>
                <option value="ua">Ukrainian</option>
              </select>
            </div>

            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
                <FontAwesomeIcon icon={faCoins} className="text-xs" /> Main Currency
              </label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="frosted-input">
                <option value="PLN">PLN</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
              <FontAwesomeIcon icon={faCoins} className="text-xs" /> Secondary Currency
            </label>
            <select value={secondaryCurrency} onChange={(e) => setSecondaryCurrency(e.target.value)} className="frosted-input">
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button type="submit" className="primary-pill py-3 text-sm">
              <span className="inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faRightToBracket} /> Login
              </span>
            </button>

            <button type="button" onClick={handleSkip} className="ghost-pill py-3 text-sm">
              <span className="inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faForward} /> Skip to Demo
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
