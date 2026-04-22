import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import CustomSelect from '../components/CustomSelect';
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

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'pl', label: 'Polish' },
    { value: 'it', label: 'Italian' },
  ];
  const currencyOptions = [
    { value: 'PLN', label: 'PLN' },
    { value: 'EUR', label: 'EUR' },
  ];

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

        <div className="space-y-4">
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
                <CustomSelect value={language} onChange={setLanguage} options={languageOptions} />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faCoins} className="text-xs" /> Main Currency
                </label>
                <CustomSelect value={currency} onChange={setCurrency} options={currencyOptions} />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/82">
                  <FontAwesomeIcon icon={faCoins} className="text-xs" /> Secondary Currency
                </label>
                <CustomSelect value={secondaryCurrency} onChange={setSecondaryCurrency} options={currencyOptions} />
              </div>
            </div>
          </article>

          <article className="glass-panel p-4">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="section-title single-line mb-1 flex items-center gap-2 text-[1.08rem] sm:text-[1.2rem]">
                  <FontAwesomeIcon icon={faBuildingColumns} className="accent-text text-sm" />
                  University Enrollment
                </h2>
                <p className="section-subtitle text-[0.86rem]">Simulated verification. Only @pollub.edu.pl emails.</p>
              </div>

              <span
                className={`inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide ${
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
                <span className="whitespace-nowrap">Send Verification Mail (Demo)</span>
              </button>

              {(verificationStatus === 'sent' || verificationStatus === 'error' || verificationStatus === 'verified') && (
                <p
                  className={`rounded-xl border px-3 py-2 text-xs break-words ${
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

        </div>
      </main>
    </div>
  );
}