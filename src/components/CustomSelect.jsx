import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CustomSelect({ value, onChange, options, placeholder = 'Select option', variant = 'default' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onPointerDown = (event) => {
      if (!containerRef.current || containerRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
  };

  const triggerClasses = variant === 'pill'
    ? `inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${open ? 'border-[rgba(255,165,214,0.45)] bg-gradient-to-r from-[#d21f7a] to-[#86004a] text-white shadow-[0_10px_22px_rgba(173,1,95,0.34)]' : 'border-white/18 bg-white/8 text-white/80 hover:border-[rgba(255,165,214,0.35)] hover:bg-white/13'}`
    : `custom-select__trigger ${open ? 'is-open' : ''}`;

  return (
    <div ref={containerRef} className={`custom-select ${variant === 'pill' ? '!w-auto' : ''}`} style={variant === 'pill' ? { width: 'auto' } : {}}>
      <button
        type="button"
        className={triggerClasses}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <span className="single-line">{selected?.label ?? placeholder}</span>
        <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${open ? 'rotate-180' : ''} ${variant === 'pill' ? 'text-[0.65rem]' : 'text-[0.72rem]'}`} />
      </button>

      {open && (
        <div className="custom-select__menu min-w-max" role="listbox">
          {options.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isActive}
                className={`custom-select__option ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="single-line">{option.label}</span>
                {isActive && <FontAwesomeIcon icon={faCheck} className="text-[0.7rem]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}