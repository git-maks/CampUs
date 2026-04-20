import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

export default function DualCurrency({ pln, eur }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85">
        <FontAwesomeIcon icon={faCoins} className="text-sm" />
      </span>
      <span className="text-[1.72rem] font-bold leading-none tracking-tight text-white">{pln} PLN</span>
      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.92rem] font-semibold text-white/85">~ {eur} EUR</span>
    </div>
  );
}
