import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import MenuDrawer from '../components/MenuDrawer';
import housingData from '../data/apartments.json';
import { housingImageById } from '../data/assetMaps';
import DualCurrency from '../components/DualCurrency';
import CustomSelect from '../components/CustomSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faHouse,
  faUserGroup,
  faImage,
  faCircleCheck,
  faFileLines,
  faLanguage,
  faClock,
  faMars,
  faVenus,
  faVenusMars,
  faStar,
  faUsers,
  faUserPlus,
  faCalendar,
  faGraduationCap,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

export default function Housing() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('all');
  const [hostAgeFilter, setHostAgeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('listings');
  const [contractLanguage, setContractLanguage] = useState('pl');
  const [contractStatus, setContractStatus] = useState('pending');
  const [signatureDate, setSignatureDate] = useState('');
  const [signatureReference, setSignatureReference] = useState('');

  const filters = ['All', 'Standalone', 'Group', 'Roommate', 'Dorm', 'Hostel'];
  const genderFilters = [
    { id: 'all', label: 'Any', icon: faUserGroup },
    { id: 'male', label: 'Men', icon: faMars },
    { id: 'female', label: 'Women', icon: faVenus },
    { id: 'mixed', label: 'Mixed', icon: faVenusMars },
  ];
  const hostAgeFilterOptions = [
    { value: 'all', label: 'Any host age' },
    { value: '18-20', label: '18-20 years' },
    { value: '21-23', label: '21-23 years' },
    { value: '24-26', label: '24-26 years' },
    { value: '27+', label: '27+ years' },
  ];
  const tabs = [
    { id: 'listings', label: 'Listings', icon: faBuilding },
    { id: 'my-home', label: 'My Home', icon: faHouse },
  ];

  const roommateOption = {
    id: 'roommate-1',
    title: 'Roommate Post - City Center Flat',
    type: 'Roommate',
    price_pln: 1250,
    price_eur: 289,
    verified: true,
    spots_available: 2,
    current_tenants: 2,
    max_tenants: 4,
    gender_preference: 'mixed',
    host_age: 22,
    host_is_student: true,
    community_verifications: 29,
    university_verifications: 12,
    rating: 4.7,
    rating_count: 24,
    description: 'Julia and Anna are looking for two roommates in a 4-person flat close to LUT bus lines.',
  };
  const genderPreferenceMeta = {
    male: { label: 'Men only', icon: faMars },
    female: { label: 'Women only', icon: faVenus },
    mixed: { label: 'Mixed', icon: faVenusMars },
  };
  const allListings = [...housingData, roommateOption];

  const matchesHostAgeFilter = (hostAgeValue) => {
    if (hostAgeFilter === 'all') {
      return true;
    }

    const parsedAge = Number(hostAgeValue);
    if (!Number.isFinite(parsedAge)) {
      return false;
    }

    switch (hostAgeFilter) {
      case '18-20':
        return parsedAge >= 18 && parsedAge <= 20;
      case '21-23':
        return parsedAge >= 21 && parsedAge <= 23;
      case '24-26':
        return parsedAge >= 24 && parsedAge <= 26;
      case '27+':
        return parsedAge >= 27;
      default:
        return true;
    }
  };

  const filteredHousing = allListings.filter((listing) => {
    const matchesType = filter === 'All' || listing.type === filter;
    const listingGenderPreference = listing.gender_preference ?? 'mixed';
    const matchesGender = genderFilter === 'all' || listingGenderPreference === genderFilter;
    const matchesHostAge = matchesHostAgeFilter(listing.host_age);

    return matchesType && matchesGender && matchesHostAge;
  });
  const reservedApartment = housingData.find((listing) => listing.id === 1) ?? housingData[0] ?? roommateOption;
  const reservation = {
    tenant: 'Marco Rossi',
    landlord: 'Lublin Student Rentals Sp. z o.o.',
    address: 'ul. Nadbystrzycka 38A, 20-618 Lublin',
    moveInDate: '01.09.2026',
    contractEndDate: '31.08.2027',
    rentPln: reservedApartment.price_pln,
    rentEur: reservedApartment.price_eur,
    depositPln: reservedApartment.price_pln,
    depositEur: reservedApartment.price_eur,
  };
  const reservedImage = housingImageById[reservedApartment.id] ?? housingImageById['roommate-1'];

  const contractDocuments = {
    pl: {
      title: 'UMOWA NAJMU LOKALU MIESZKALNEGO',
      subtitle: 'Dokument demo - wersja do podpisu elektronicznego',
      issueDateLabel: 'Data dokumentu',
      issueDate: '20.04.2026',
      cityLabel: 'Miejsce',
      city: 'Lublin',
      partiesHeading: 'Strony umowy',
      periodLabel: 'Okres najmu',
      periodValue: `${reservation.moveInDate} - ${reservation.contractEndDate}`,
      rentLabel: 'Czynsz miesieczny',
      rentValue: `${reservation.rentPln} PLN (ok. ${reservation.rentEur} EUR)`,
      depositLabel: 'Kaucja',
      depositValue: `${reservation.depositPln} PLN (ok. ${reservation.depositEur} EUR)`,
      parties: [
        { label: 'Wynajmujacy', value: reservation.landlord },
        { label: 'Najemca', value: reservation.tenant },
        { label: 'Lokal', value: `${reservedApartment.title}, ${reservation.address}` },
      ],
      clauses: [
        {
          heading: '1. Przedmiot najmu',
          body: 'Wynajmujacy oddaje Najemcy lokal mieszkalny do uzywania na cele mieszkaniowe.',
        },
        {
          heading: '2. Czynsz i oplaty',
          body: 'Czynsz jest platny do 5 dnia kazdego miesiaca. Media sa rozliczane wedlug faktycznego zuzycia.',
        },
        {
          heading: '3. Zasady uzytkowania',
          body: 'Najemca zobowiazuje sie dbac o lokal, przestrzegac regulaminu budynku oraz nie podnajmowac lokalu bez zgody Wynajmujacego.',
        },
        {
          heading: '4. Rozwiazanie umowy',
          body: 'W przypadku naruszenia warunkow umowy strony moga wypowiedziec umowe zgodnie z przepisami prawa.',
        },
      ],
      landlordSignatureLabel: 'Podpis Wynajmujacego',
      tenantSignatureLabel: 'Podpis Najemcy',
      statusPending: 'Oczekuje na podpis Najemcy',
      statusSigned: 'Umowa podpisana',
      cardHint: 'Kliknij dokument aby przelaczyc jezyk.',
    },
    it: {
      title: 'CONTRATTO DI LOCAZIONE ABITATIVA',
      subtitle: 'Documento demo - versione per firma elettronica',
      issueDateLabel: 'Data documento',
      issueDate: '20.04.2026',
      cityLabel: 'Luogo',
      city: 'Lublino',
      partiesHeading: 'Parti del contratto',
      periodLabel: 'Durata',
      periodValue: `${reservation.moveInDate} - ${reservation.contractEndDate}`,
      rentLabel: 'Canone mensile',
      rentValue: `${reservation.rentPln} PLN (circa ${reservation.rentEur} EUR)`,
      depositLabel: 'Deposito',
      depositValue: `${reservation.depositPln} PLN (circa ${reservation.depositEur} EUR)`,
      parties: [
        { label: 'Locatore', value: reservation.landlord },
        { label: 'Conduttore', value: reservation.tenant },
        { label: 'Immobile', value: `${reservedApartment.title}, ${reservation.address}` },
      ],
      clauses: [
        {
          heading: '1. Oggetto della locazione',
          body: 'Il Locatore concede al Conduttore l immobile ad uso abitativo.',
        },
        {
          heading: '2. Canone e spese',
          body: 'Il canone e dovuto entro il giorno 5 di ogni mese. Le utenze sono calcolate in base al consumo reale.',
        },
        {
          heading: '3. Regole di utilizzo',
          body: 'Il Conduttore si impegna a mantenere l alloggio in buono stato e a non sublocare senza autorizzazione scritta.',
        },
        {
          heading: '4. Risoluzione',
          body: 'In caso di violazione delle condizioni, il contratto puo essere risolto secondo la normativa vigente.',
        },
      ],
      landlordSignatureLabel: 'Firma del Locatore',
      tenantSignatureLabel: 'Firma del Conduttore',
      statusPending: 'In attesa della firma del Conduttore',
      statusSigned: 'Contratto firmato',
      cardHint: 'Tocca il documento per cambiare lingua.',
    },
  };

  const currentLanguageLabel = contractLanguage === 'pl' ? 'Polish' : 'Italian';
  const nextLanguageLabel = contractLanguage === 'pl' ? 'Italian' : 'Polish';
  const contractDocument = contractDocuments[contractLanguage];
  const homeStatusLabel = contractStatus === 'signed' ? 'Contract signed' : 'Pending contract';

  const formattedSignatureTimestamp = useMemo(() => {
    if (!signatureDate) {
      return '';
    }

    return new Date(signatureDate).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [signatureDate]);

  const switchContractLanguage = () => {
    setContractLanguage((previousLanguage) => (previousLanguage === 'pl' ? 'it' : 'pl'));
  };

  const handleSignContract = () => {
    if (contractStatus === 'signed') {
      return;
    }

    setContractStatus('signed');
    setSignatureDate(new Date().toISOString());
    setSignatureReference(`LEASE-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleResetContractDemo = () => {
    setContractStatus('pending');
    setSignatureDate('');
    setSignatureReference('');
  };

  const handleContractCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchContractLanguage();
    }
  };

  const housingTypeIcons = {
    Standalone: faHouse,
    Group: faUserGroup,
    Roommate: faUserGroup,
  };

  return (
    <div className="app-shell">
      <Header toggleMenu={() => setDrawerOpen(!drawerOpen)} />
      <MenuDrawer open={drawerOpen} close={() => setDrawerOpen(false)} />

      <main className="page-main space-y-4">
        <h1 className="section-title flex items-center gap-2">
          <FontAwesomeIcon icon={faBuilding} className="accent-text text-base" />
          Housing
        </h1>
        <p className="section-subtitle">Student board with clear ratings plus university verification for each host.</p>

        <div className="grid grid-cols-2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'border-[rgba(255,165,214,0.45)] bg-gradient-to-r from-[#d21f7a] to-[#86004a] text-white shadow-[0_12px_24px_rgba(173,1,95,0.34)]'
                  : 'border-white/18 bg-white/8 text-white/80 hover:bg-white/13'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="text-xs" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'listings' ? (
          <>
            <div className="flex flex-wrap gap-2 pb-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    filter === f
                      ? 'border-[rgba(255,165,214,0.45)] bg-gradient-to-r from-[#d21f7a] to-[#86004a] text-white shadow-[0_10px_22px_rgba(173,1,95,0.34)]'
                      : 'border-white/18 bg-white/8 text-white/80 hover:border-[rgba(255,165,214,0.35)] hover:bg-white/13'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pb-1">
              <div className="space-y-2 w-full">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/58">Roommate Preference & Host Age</p>
                <div className="flex flex-wrap items-center gap-2">
                  {genderFilters.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setGenderFilter(option.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                        genderFilter === option.id
                          ? 'border-[rgba(255,165,214,0.45)] bg-gradient-to-r from-[#d21f7a] to-[#86004a] text-white shadow-[0_10px_22px_rgba(173,1,95,0.34)]'
                          : 'border-white/18 bg-white/8 text-white/80 hover:border-[rgba(255,165,214,0.35)] hover:bg-white/13'
                      }`}
                    >
                      <FontAwesomeIcon icon={option.icon} className="text-[0.65rem]" />
                      {option.label}
                    </button>
                  ))}
                  <CustomSelect
                    value={hostAgeFilter}
                    onChange={setHostAgeFilter}
                    options={hostAgeFilterOptions}
                    placeholder="Any host age"
                    variant="pill"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredHousing.map((apt) => {
                const listingImage = housingImageById[apt.id];
                const listingGenderPreference = apt.gender_preference ?? 'mixed';
                const genderMeta = genderPreferenceMeta[listingGenderPreference] ?? genderPreferenceMeta.mixed;
                const availableSpots = Math.max(1, Number(apt.spots_available ?? 1));
                const currentTenants = Math.max(0, Number(apt.current_tenants ?? 0));
                const maxTenants = Math.max(availableSpots + currentTenants, Number(apt.max_tenants ?? availableSpots + currentTenants));
                const hostAge = Number(apt.host_age);
                const hasHostAge = Number.isFinite(hostAge) && hostAge > 0;
                const universityVerifications = Math.max(0, Number(apt.university_verifications ?? 0));
                const hostIsStudentVerified = Boolean(apt.host_is_student) && universityVerifications > 0;
                const rating = Number(apt.rating ?? 0);
                const ratingCount = Math.max(0, Number(apt.rating_count ?? 0));
                const hasRating = Number.isFinite(rating) && rating > 0 && ratingCount > 0;

                return (
                <article key={apt.id} className="glass-panel p-4">
                  <div className="relative h-44 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/20 to-white/7">
                    {listingImage ? (
                      <img src={listingImage} alt={`${apt.title} preview`} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <>
                        <div className="absolute -left-5 -top-6 h-28 w-28 rounded-full bg-[#ad015f]/30 blur-2xl" />
                        <div className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full bg-[#da2a86]/26 blur-2xl" />
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1020]/70 to-transparent" />
                    <p className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/90">
                      <FontAwesomeIcon icon={housingTypeIcons[apt.type] || faBuilding} className="text-[0.6rem]" />
                      {apt.type} option
                    </p>
                    <p className="absolute bottom-3 left-3 inline-flex items-center gap-2 text-sm text-white/85">
                      <FontAwesomeIcon icon={faImage} className="text-xs" />
                      Preview
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="single-line text-[1.35rem] font-semibold leading-tight tracking-tight text-white">{apt.title}</h3>
                      <p className="single-line mt-1 text-sm text-white/68">
                        {availableSpots} spot{availableSpots === 1 ? '' : 's'} open | {apt.type}
                        {hasHostAge ? ` | host ${hostAge} y/o` : ''}
                      </p>
                    </div>
                    <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#ffd899]/50 bg-[#ffd899]/15 px-2 py-1 text-xs font-semibold whitespace-nowrap text-[#ffe9b8]">
                      <FontAwesomeIcon icon={faStar} className="text-[0.62rem]" />
                      {hasRating ? `${rating.toFixed(1)} (${ratingCount})` : 'New listing'}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-white/78">{apt.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-2.5 py-1.5 text-white/80" title="Current tenants">
                      <FontAwesomeIcon icon={faUsers} className="text-white/55 text-[0.7rem]" />
                      <span>{currentTenants} current</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-2.5 py-1.5 text-white/80" title="Open spots">
                      <FontAwesomeIcon icon={faUserPlus} className="text-white/55 text-[0.7rem]" />
                      <span>{availableSpots} open</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-2.5 py-1.5 text-white/80" title="Preference">
                      <FontAwesomeIcon icon={genderMeta.icon} className="text-white/55 text-[0.7rem]" />
                      <span>{genderMeta.label}</span>
                    </div>
                    {hasHostAge && (
                      <div className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-2.5 py-1.5 text-white/80" title="Host age">
                        <FontAwesomeIcon icon={faCalendar} className="text-white/55 text-[0.7rem]" />
                        <span>{hostAge}y</span>
                      </div>
                    )}
                    <div className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 ${hostIsStudentVerified ? 'border-[rgba(255,165,214,0.32)] bg-[rgba(173,1,95,0.14)] text-[#ffc9e5]' : 'border-white/12 bg-white/5 text-white/80'}`} title="Host status">
                      <FontAwesomeIcon icon={hostIsStudentVerified ? faGraduationCap : faClock} className={hostIsStudentVerified ? 'text-[0.7rem]' : 'text-white/55 text-[0.7rem]'} />
                      <span>{hostIsStudentVerified ? `Verified student (${universityVerifications})` : 'Not verified'}</span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/16 pt-4">
                    <DualCurrency pln={apt.price_pln} eur={apt.price_eur} />
                  </div>
                </article>
              );
              })}

              {filteredHousing.length === 0 && (
                <article className="glass-panel p-4 text-sm text-white/75">
                  No listings match the selected filters. Try another host age or roommate preference.
                </article>
              )}
            </div>
          </>
        ) : (
          <section className="space-y-4">
            <article className="glass-panel p-4">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="accent-text inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                    <FontAwesomeIcon icon={faHouse} className="text-[0.7rem]" />
                    Reserved apartment
                  </p>
                  <h2 className="mt-1 text-[1.45rem] font-semibold leading-tight tracking-tight text-white">{reservedApartment.title}</h2>
                </div>
                <span className="accent-chip inline-flex max-w-full items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  <FontAwesomeIcon icon={contractStatus === 'signed' ? faCircleCheck : faClock} className="text-[0.62rem]" />
                  {homeStatusLabel}
                </span>
              </div>

              <div className="relative h-36 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/18 to-white/5">
                {reservedImage ? (
                  <img src={reservedImage} alt={`${reservedApartment.title} preview`} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <>
                    <div className="absolute -left-5 -top-6 h-24 w-24 rounded-full bg-[#ad015f]/32 blur-2xl" />
                    <div className="absolute -bottom-8 -right-6 h-24 w-24 rounded-full bg-[#da2a86]/26 blur-2xl" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1020]/72 to-transparent" />
                <p className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/90">
                  <FontAwesomeIcon icon={faImage} className="text-[0.6rem]" />
                  Home preview
                </p>
                <p className="absolute bottom-3 left-3 text-sm text-white/78">{reservation.address}</p>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/78">{reservedApartment.description}</p>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/60">Monthly rent</p>
                  <DualCurrency pln={reservation.rentPln} eur={reservation.rentEur} />
                </div>

                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/60">Deposit</p>
                  <DualCurrency pln={reservation.depositPln} eur={reservation.depositEur} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 rounded-2xl border border-white/12 bg-white/5 p-3 text-sm text-white/80 sm:grid-cols-2">
                <p className="single-line"><span className="text-white/55">Tenant:</span> {reservation.tenant}</p>
                <p className="single-line"><span className="text-white/55">Landlord:</span> {reservation.landlord}</p>
                <p className="single-line"><span className="text-white/55">Move-in:</span> {reservation.moveInDate}</p>
                <p className="single-line"><span className="text-white/55">Contract ends:</span> {reservation.contractEndDate}</p>
              </div>
            </article>

            <article className="glass-panel p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="section-title mb-1 flex items-center gap-2 text-[1.2rem]">
                    <FontAwesomeIcon icon={faFileLines} className="accent-text text-sm" />
                    Lease Contract PDF Preview
                  </h3>
                  <p className="section-subtitle">Current language: {currentLanguageLabel}</p>
                </div>

                <button type="button" onClick={switchContractLanguage} className="ghost-pill inline-flex max-w-full items-center gap-2 px-3 py-2 text-xs">
                  <FontAwesomeIcon icon={faLanguage} className="text-[0.72rem]" />
                  Switch to {nextLanguageLabel}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {contractStatus === 'pending' ? (
                  <button type="button" onClick={handleSignContract} className="primary-pill inline-flex items-center gap-2 px-4 py-2 text-sm">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-xs" />
                    Sign Contract (Demo)
                  </button>
                ) : (
                  <button type="button" onClick={handleResetContractDemo} className="ghost-pill inline-flex items-center gap-2 px-4 py-2 text-sm">
                    <FontAwesomeIcon icon={faClock} className="text-xs" />
                    Reset Signature Demo
                  </button>
                )}
                <p className="text-xs text-white/66">{contractDocument.cardHint}</p>
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={switchContractLanguage}
                onKeyDown={handleContractCardKeyDown}
                className="mt-3 rounded-2xl border border-[#e0c1d4] bg-[#f7edf3] p-3 text-left text-[#2f1729] shadow-[0_16px_32px_rgba(58,26,47,0.22)] transition hover:shadow-[0_18px_34px_rgba(58,26,47,0.28)]"
                aria-label={`Switch contract language to ${nextLanguageLabel}`}
              >
                <div className="rounded-xl border border-[#d7b3ca] bg-white p-4">
                  <div className="border-b border-[#eed9e7] pb-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#91597a]">CampUs Lease PDF</p>
                        <h4 className="mt-2 font-serif text-lg font-semibold text-[#3c1f34]">{contractDocument.title}</h4>
                        <p className="mt-1 text-xs text-[#6f5063]">{contractDocument.subtitle}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#d4a8c2] bg-[#fef6fa] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#914c74]">
                        <FontAwesomeIcon icon={contractStatus === 'signed' ? faCircleCheck : faClock} className="text-[0.6rem]" />
                        {contractStatus === 'signed' ? contractDocument.statusSigned : contractDocument.statusPending}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-[#5d3c52] sm:grid-cols-2">
                      <p><span className="font-semibold">{contractDocument.cityLabel}:</span> {contractDocument.city}</p>
                      <p><span className="font-semibold">{contractDocument.issueDateLabel}:</span> {contractDocument.issueDate}</p>
                      <p><span className="font-semibold">{contractDocument.periodLabel}:</span> {contractDocument.periodValue}</p>
                      <p><span className="font-semibold">{contractDocument.rentLabel}:</span> {contractDocument.rentValue}</p>
                      <p className="sm:col-span-2"><span className="font-semibold">{contractDocument.depositLabel}:</span> {contractDocument.depositValue}</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8d5474]">{contractDocument.partiesHeading}</p>
                      <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-[#4a2c3e] sm:grid-cols-2">
                        {contractDocument.parties.map((party) => (
                          <p key={party.label}><span className="font-semibold">{party.label}:</span> {party.value}</p>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-[0.79rem] leading-relaxed text-[#3f2035]">
                      {contractDocument.clauses.map((clause) => (
                        <div key={clause.heading} className="rounded-lg border border-[#ecd8e5] bg-[#fff9fc] px-3 py-2">
                          <p className="font-semibold text-[#673f59]">{clause.heading}</p>
                          <p className="mt-1">{clause.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 text-xs text-[#533449] sm:grid-cols-2">
                    <div className="rounded-lg border border-[#e7d0df] bg-[#fffdfd] p-3">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#825570]">{contractDocument.landlordSignatureLabel}</p>
                      <div className="mt-6 border-t border-dashed border-[#cda8bf]" />
                      <p className="mt-2">{reservation.landlord}</p>
                    </div>

                    <div className="rounded-lg border border-[#e7d0df] bg-[#fffdfd] p-3">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#825570]">{contractDocument.tenantSignatureLabel}</p>
                      <div className="mt-6 border-t border-dashed border-[#cda8bf]" />
                      <p className="mt-2">{contractStatus === 'signed' ? reservation.tenant : 'Pending signature'}</p>
                    </div>
                  </div>

                  {contractStatus === 'signed' && (
                    <p className="mt-3 rounded-lg border border-[#d89fbe] bg-[#fff0f8] px-3 py-2 text-xs text-[#7e315a]">
                      Digitally signed on {formattedSignatureTimestamp}. Reference: {signatureReference}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-3 text-xs text-white/58">Demo contract only. No legal validity.</p>
            </article>
          </section>
        )}
      </main>
    </div>
  );
}
