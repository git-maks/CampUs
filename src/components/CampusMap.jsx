import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { icon as toSvgIcon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMap,
  faFilter,
  faExpand,
  faCompress,
  faStore,
  faUtensils,
  faMartiniGlass,
  faCalendarDays,
  faBuilding,
  faLocationDot,
  faCircleCheck,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import necessitiesDocs from '../data/necessities.json';
import calendarDocs from '../data/calendar.json';
import housingDocs from '../data/apartments.json';

const campusPosition = [51.236368585419264, 22.54929154103867];

const necessityCoordinatesById = {
  1: [51.2446, 22.5402],
  2: [51.241, 22.5516],
  3: [51.242, 22.561],
  4: [51.239, 22.5389],
  8: [51.2358, 22.5499],
  9: [51.2318, 22.5428],
  10: [51.2444, 22.5568],
  12: [51.2305, 22.5592],
  13: [51.2382, 22.5547],
  14: [51.2344, 22.5407],
};

const eventCoordinatesById = {
  1: [51.2441, 22.5482],
  2: [51.2361, 22.544],
  3: [51.233, 22.558],
};

const housingCoordinatesById = {
  1: [51.2414, 22.5438],
  2: [51.2386, 22.5469],
  3: [51.2369, 22.5601],
  4: [51.2348, 22.5531],
  5: [51.2309, 22.551],
  6: [51.2299, 22.545],
  7: [51.2326, 22.5474],
  8: [51.2294, 22.5386],
};

const layerConfig = {
  shops: {
    label: 'Shops',
    icon: faStore,
    markerColor: '#38bdf8',
  },
  restaurants: {
    label: 'Restaurants',
    icon: faUtensils,
    markerColor: '#fb923c',
  },
  bars: {
    label: 'Bars',
    icon: faMartiniGlass,
    markerColor: '#c084fc',
  },
  events: {
    label: 'Events & Parties',
    icon: faCalendarDays,
    markerColor: '#f43f5e',
  },
  apartments: {
    label: 'Apartments',
    icon: faBuilding,
    markerColor: '#22c55e',
  },
};

const categoryOrder = ['shops', 'restaurants', 'bars', 'events', 'apartments'];

function makeMarkerIcon(markerColor, markerIcon) {
  const markerSvg = toSvgIcon(markerIcon, {
    styles: {
      color: '#ffffff',
    },
  }).html.join('');

  return L.divIcon({
    className: 'campus-map-pin-host',
    html: `<span class="campus-map-pin" style="background:${markerColor}"><span class="campus-map-pin__icon">${markerSvg}</span></span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -10],
  });
}

const userMarkerSvg = toSvgIcon(faLocationDot, {
  styles: {
    color: '#ffffff',
  },
}).html.join('');

const userLocationIcon = L.divIcon({
  className: 'campus-map-pin-host',
  html: `<span class="campus-map-pin campus-map-pin--user"><span class="campus-map-pin__icon">${userMarkerSvg}</span></span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -13],
});

function MapInteractionHandler({ isFullscreen }) {
  const map = useMapEvents({
    click: () => {
      if (isFullscreen) {
        return;
      }

      map.scrollWheelZoom.enable();
      if (map.dragging) map.dragging.enable();
    },
    mouseout: () => {
      if (isFullscreen) {
        return;
      }

      map.scrollWheelZoom.disable();
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouch && map.dragging) map.dragging.disable();
    },
  });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isFullscreen) {
      map.scrollWheelZoom.enable();
      if (map.dragging) {
        map.dragging.enable();
      }
      return;
    }

    map.scrollWheelZoom.disable();
    if (isTouch && map.dragging) {
      map.dragging.disable();
    }
  }, [isFullscreen, map]);

  return null;
}

export default function CampusMap() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState({
    shops: true,
    restaurants: true,
    bars: true,
    events: true,
    apartments: true,
  });

  useEffect(() => {
    if (!isFullscreen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isFullscreen]);

  const markerIcons = useMemo(
    () =>
      categoryOrder.reduce((accumulator, category) => {
        const config = layerConfig[category];
        accumulator[category] = makeMarkerIcon(config.markerColor, config.icon);
        return accumulator;
      }, {}),
    [],
  );

  const mapPoints = useMemo(() => {
    const shopPoints = necessitiesDocs
      .filter((item) => item.type === 'Grocery' || item.type === 'Pharmacy')
      .filter((item) => necessityCoordinatesById[item.id])
      .map((item) => ({
        id: `shop-${item.id}`,
        category: 'shops',
        title: item.name,
        subtitle: item.discount,
        position: necessityCoordinatesById[item.id],
      }));

    const restaurantPoints = necessitiesDocs
      .filter((item) => item.type === 'Restaurant' || item.type === 'Cafe')
      .filter((item) => necessityCoordinatesById[item.id])
      .map((item) => ({
        id: `restaurant-${item.id}`,
        category: 'restaurants',
        title: item.name,
        subtitle: item.discount,
        position: necessityCoordinatesById[item.id],
      }));

    const barPoints = necessitiesDocs
      .filter((item) => item.type === 'Club')
      .filter((item) => necessityCoordinatesById[item.id])
      .map((item) => ({
        id: `bar-${item.id}`,
        category: 'bars',
        title: item.name,
        subtitle: item.discount,
        position: necessityCoordinatesById[item.id],
      }));

    const eventPoints = calendarDocs
      .filter((item) => eventCoordinatesById[item.id])
      .map((item) => ({
        id: `event-${item.id}`,
        category: 'events',
        title: item.title,
        subtitle: `${item.type} | ${new Date(item.date).toLocaleDateString('en-GB')}`,
        position: eventCoordinatesById[item.id],
      }));

    const apartmentPoints = housingDocs
      .filter((item) => housingCoordinatesById[item.id])
      .map((item) => ({
        id: `apartment-${item.id}`,
        category: 'apartments',
        title: item.title,
        subtitle: `${item.spots_available ?? 1} spot(s) | ${item.price_pln} PLN`,
        position: housingCoordinatesById[item.id],
      }));

    return [...shopPoints, ...restaurantPoints, ...barPoints, ...eventPoints, ...apartmentPoints];
  }, []);

  const visiblePoints = useMemo(
    () => mapPoints.filter((point) => visibleLayers[point.category]),
    [mapPoints, visibleLayers],
  );

  const activeLayerCount = categoryOrder.filter((category) => visibleLayers[category]).length;

  const toggleLayer = (category) => {
    setVisibleLayers((previousState) => ({
      ...previousState,
      [category]: !previousState[category],
    }));
  };

  const setAllLayers = (nextVisibility) => {
    setVisibleLayers(
      categoryOrder.reduce((accumulator, category) => {
        accumulator[category] = nextVisibility;
        return accumulator;
      }, {}),
    );
  };

  const layerPanel = (
    <div className="rounded-2xl border border-white/25 bg-[rgba(248,251,255,0.9)] p-3 text-slate-900 shadow-[0_12px_32px_rgba(35,51,85,0.24)] backdrop-blur-md">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        <FontAwesomeIcon icon={faLayerGroup} className="text-[0.62rem]" />
        Map layers
      </p>

      <div className="mt-3 space-y-2">
        {categoryOrder.map((category) => {
          const config = layerConfig[category];
          const isActive = visibleLayers[category];

          return (
            <button
              key={category}
              type="button"
              onClick={() => toggleLayer(category)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                isActive
                  ? 'border-[rgba(13,148,136,0.35)] bg-[rgba(45,212,191,0.18)] text-slate-900'
                  : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[0.72rem] text-white"
                  style={{ background: config.markerColor }}
                >
                  <FontAwesomeIcon icon={config.icon} />
                </span>
                {config.label}
              </span>
              {isActive ? <FontAwesomeIcon icon={faCircleCheck} className="text-[0.76rem] text-emerald-600" /> : null}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setAllLayers(true)}
          className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Show all
        </button>
        <button
          type="button"
          onClick={() => setAllLayers(false)}
          className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Hide all
        </button>
      </div>

      <p className="mt-3 text-[0.68rem] text-slate-500">Active layers: {activeLayerCount}/5</p>
    </div>
  );

  const mapViewport = (mode) => (
    <div
      className={`campus-live-map relative overflow-hidden rounded-2xl border border-white/25 bg-[#edf4ff] ${
        mode === 'fullscreen' ? 'h-full' : 'h-[360px] sm:h-[430px]'
      }`}
    >
      <MapContainer
        key={mode}
        center={campusPosition}
        zoom={14}
        minZoom={12}
        maxZoom={19}
        scrollWheelZoom={false}
        zoomControl={mode === 'fullscreen'}
        className="h-full w-full"
      >
        <MapInteractionHandler isFullscreen={mode === 'fullscreen'} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        />

        <Circle
          center={campusPosition}
          radius={260}
          pathOptions={{ color: '#0ea5e9', fillColor: '#38bdf8', fillOpacity: 0.14, weight: 1 }}
        />

        <Marker position={campusPosition} icon={userLocationIcon}>
          <Popup>
            <div className="min-w-[190px]">
              <p className="text-xs uppercase tracking-wider text-slate-500">Current location</p>
              <p className="mt-1 font-semibold text-slate-900">Lublin University of Technology</p>
              <p className="mt-1 text-xs text-slate-600">Campus center near your current pin</p>
            </div>
          </Popup>
        </Marker>

        {visiblePoints.map((point) => (
          <Marker key={point.id} position={point.position} icon={markerIcons[point.category]}>
            <Popup>
              <div className="min-w-[190px]">
                <p className="text-xs uppercase tracking-wider text-slate-500">{layerConfig[point.category].label}</p>
                <p className="mt-1 font-semibold text-slate-900">{point.title}</p>
                <p className="mt-1 text-xs text-slate-600">{point.subtitle}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );

  return (
    <section className="glass-panel p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="section-title mb-1 flex items-center gap-2 text-[1.25rem]">
            <FontAwesomeIcon icon={faMap} className="accent-text text-sm" />
            Campus Live Map
          </h2>
          <p className="section-subtitle">Lighter city map with your pin and nearby POIs around campus.</p>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsFilterOpen((previousState) => !previousState)}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/28 bg-[rgba(247,251,255,0.88)] px-3 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
        >
          <FontAwesomeIcon icon={faFilter} className="text-[0.68rem]" />
          Filter
        </button>

        <button
          type="button"
          onClick={() => setIsFullscreen((previousState) => !previousState)}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/28 bg-[rgba(247,251,255,0.88)] px-3 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
        >
          <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} className="text-[0.68rem]" />
          {isFullscreen ? 'Close' : 'Fullscreen'}
        </button>
      </div>

      {!isFullscreen && isFilterOpen && <div className="mb-3">{layerPanel}</div>}

      {mapViewport('inline')}

      {isFullscreen &&
        createPortal(
          <div className="fixed inset-0 z-[220] bg-[#edf3fb]/98 p-2 sm:p-3">
            <div className="relative h-full w-full">
              {mapViewport('fullscreen')}

              <div className="absolute right-2 top-2 z-[1600] flex items-center gap-2 sm:right-3 sm:top-3">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen((previousState) => !previousState)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-700/90 bg-slate-900/95 px-3 text-xs font-semibold text-slate-100 shadow-[0_10px_22px_rgba(8,18,38,0.45)] transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <FontAwesomeIcon icon={faFilter} className="text-[0.68rem]" />
                  Filter
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-rose-800/85 bg-rose-700/95 px-3 text-xs font-semibold text-white shadow-[0_10px_22px_rgba(127,29,29,0.44)] transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <FontAwesomeIcon icon={faCompress} className="text-[0.68rem]" />
                  Close
                </button>
              </div>

              {isFilterOpen && (
                <div className="absolute left-2 top-14 z-[1600] w-[min(88vw,280px)] sm:left-3 sm:top-[4.35rem]">
                  {layerPanel}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
