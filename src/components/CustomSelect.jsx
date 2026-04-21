import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CustomSelect({ value, onChange, options, placeholder = 'Select option' }) {
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

  return (
    <div ref={containerRef} className="custom-select">
      <button
        type="button"
        className={`custom-select__trigger ${open ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <span className="single-line">{selected?.label ?? placeholder}</span>
        <FontAwesomeIcon icon={faChevronDown} className={`text-[0.72rem] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="custom-select__menu" role="listbox">
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