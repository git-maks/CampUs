import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import userProfile from '../data/user-profile.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLanguage,
  faCoins,
  faEnvelope,
  faPaperPlane,
  faCircleCheck,
  faClock,
  faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';

const POLLUB_EMAIL_PATTERN = /^[a-z0-9._%+-]+@pollub\.edu\.pl$/i;

function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default function ProfileSettings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [surname, setSurname] = useState(userProfile.surname);
  const [language, setLanguage] = useState(userProfile.language || 'en');
  const [currency, setCurrency] = useState(userProfile.currency_default || 'PLN');
  const [secondaryCurrency, setSecondaryCurrency] = useState(userProfile.currency_secondary || 'EUR');

  const [universityEmail, setUniversityEmail] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');

  const trimmedEmail = universityEmail.trim();
  const isValidPollubEmail = useMemo(() => POLLUB_EMAIL_PATTERN.test(trimmedEmail), [trimmedEmail]);

  const statusLabel =
    verificationStatus === 'verified'
      ? 'Verified'
      : verificationStatus === 'sent'
        ? 'Code sent'
        : verificationStatus === 'error'
          ? 'Needs action'
          : 'Not verified';

  const handleUniversityEmailChange = (event) => {
    setUniversityEmail(event.target.value);
    setEnteredCode('');
    setSentCode('');
    setVerificationStatus('idle');
    setVerificationMessage('');
  };

  const handleSendVerification = () => {
    if (!isValidPollubEmail) {
      setVerificationStatus('error');
      setVerificationMessage('Use your university email ending with @pollub.edu.pl.');
      return;
    }

    const generatedCode = createVerificationCode();
    setSentCode(generatedCode);
    setEnteredCode('');
    setVerificationStatus('sent');
    setVerificationMessage(`Simulated mail sent to ${trimmedEmail}. Demo code: ${generatedCode}`);
  };

  const handleConfirmCode = () => {
    if (verificationStatus !== 'sent') {
      return;
    }

    if (enteredCode.trim() !== sentCode) {
      setVerificationStatus('error');
      setVerificationMessage('Invalid verification code. Please try again.');
      return;
    }

    setVerificationStatus('verified');
    setVerificationMessage(`University enrollment verified for ${trimmedEmail} (simulated).`);
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    setProfileMessage('Profile settings saved for this demo session.');
  };

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="accent-text text-base" />
          Profile Settings
        </h1>
        <p className="section-subtitle">Manage your personal details and verify your university enrollment.</p>

        <form className="space-y-4" onSubmit={handleSaveProfile}>
          <article className="glass-panel p-4">
            <h2 className="section-title mb-3 flex items-center gap-2 text-[1.2rem]">
              <FontAwesomeIcon icon={faUser} className="accent-text text-sm" />
              Personal Profile
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faUser} className="text-xs" /> Name
                </label>
                <input value={name} onChange={(event) => setName(event.target.value)} className="frosted-input" placeholder="First name" />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faUser} className="text-xs" /> Surname
                </label>
                <input value={surname} onChange={(event) => setSurname(event.target.value)} className="frosted-input" placeholder="Surname" />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faLanguage} className="text-xs" /> Language
                </label>
                <select value={language} onChange={(event) => setLanguage(event.target.value)} className="frosted-input">
                  <option value="en">English</option>
                  <option value="pl">Polish</option>
                  <option value="it">Italian</option>
                </select>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faCoins} className="text-xs" /> Main Currency
                </label>
                <select value={currency} onChange={(event) => setCurrency(event.target.value)} className="frosted-input">
                  <option value="PLN">PLN</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faCoins} className="text-xs" /> Secondary Currency
                </label>
                <select value={secondaryCurrency} onChange={(event) => setSecondaryCurrency(event.target.value)} className="frosted-input">
                  <option value="EUR">EUR</option>
                  <option value="PLN">PLN</option>
                </select>
              </div>
            </div>
          </article>

          <article className="glass-panel p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="section-title mb-1 flex items-center gap-2 text-[1.2rem]">
                  <FontAwesomeIcon icon={faBuildingColumns} className="accent-text text-sm" />
                  University Enrollment
                </h2>
                <p className="section-subtitle">Verification is simulated and accepts only @pollub.edu.pl emails.</p>
              </div>

              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  verificationStatus === 'verified'
                    ? 'border-[rgba(255,165,214,0.45)] bg-[rgba(173,1,95,0.28)] text-[#ffe5f3]'
                    : 'border-white/20 bg-white/10 text-white/82'
                }`}
              >
                <FontAwesomeIcon icon={verificationStatus === 'verified' ? faCircleCheck : faClock} className="text-[0.62rem]" />
                {statusLabel}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" /> University Email
                </label>
                <input
                  type="email"
                  value={universityEmail}
                  onChange={handleUniversityEmailChange}
                  className="frosted-input"
                  placeholder="name.surname@pollub.edu.pl"
                />
              </div>

              <button type="button" onClick={handleSendVerification} className="primary-pill inline-flex items-center gap-2 px-4 py-2 text-sm">
                <FontAwesomeIcon icon={faPaperPlane} />
                Send Verification Mail (Demo)
              </button>

              {(verificationStatus === 'sent' || verificationStatus === 'error' || verificationStatus === 'verified') && (
                <p
                  className={`rounded-xl border px-3 py-2 text-xs ${
                    verificationStatus === 'verified'
                      ? 'border-[rgba(255,165,214,0.45)] bg-[rgba(173,1,95,0.18)] text-[#ffe5f3]'
                      : 'border-white/15 bg-white/8 text-white/75'
                  }`}
                >
                  {verificationMessage}
                </p>
              )}

              {verificationStatus !== 'verified' && sentCode && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-white/82">Verification Code</label>
                    <input
                      value={enteredCode}
                      onChange={(event) => setEnteredCode(event.target.value)}
                      className="frosted-input"
                      placeholder="Enter the 6-digit code"
                      inputMode="numeric"
                    />
                  </div>
                  <button type="button" onClick={handleConfirmCode} className="ghost-pill h-[46px] px-4 text-sm">
                    Confirm Code
                  </button>
                </div>
              )}
            </div>
          </article>

          <div className="flex items-center gap-3">
            <button type="submit" className="primary-pill px-5 py-2 text-sm">Save Profile</button>
            {profileMessage && <p className="accent-text text-xs">{profileMessage}</p>}
          </div>
        </form>
      </main>
    </div>
  );
}