import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

export default function DualCurrency({ pln, eur }) {
  return (
    <div className="flex items-center gap-2">
      <span className="accent-icon-wrap inline-flex h-8 w-8 items-center justify-center rounded-full">
        <FontAwesomeIcon icon={faCoins} className="text-sm" />
      </span>
      <span className="text-[1.72rem] font-bold leading-none tracking-tight text-white">{pln} PLN</span>
      <span className="accent-chip-soft rounded-full px-3 py-1 text-[0.92rem] font-semibold">~ {eur} EUR</span>
    </div>
  );
}
