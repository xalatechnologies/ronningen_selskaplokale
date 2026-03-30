import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { VENUE_LAT, VENUE_LNG } from '../lib/venue';
import 'leaflet/dist/leaflet.css';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function createPillIcon(label: string) {
  return L.divIcon({
    className: 'contact-venue-pill-marker',
    html: `<div class="contact-venue-pill-inner">${escapeHtml(label)}</div>`,
    iconSize: [200, 44],
    iconAnchor: [100, 44],
  });
}

type ContactMapProps = {
  pillLabel: string;
  ariaLabel: string;
};

export const ContactMap: React.FC<ContactMapProps> = ({ pillLabel, ariaLabel }) => {
  const icon = useMemo(() => createPillIcon(pillLabel), [pillLabel]);

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="overflow-hidden rounded-2xl border border-brand-200/90 bg-brand-100 shadow-inner [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:text-brand-700"
    >
      <MapContainer
        center={[VENUE_LAT, VENUE_LNG]}
        zoom={16}
        scrollWheelZoom={false}
        className="z-0 h-[min(42vh,400px)] min-h-[260px] w-full [&_.leaflet-tile-pane]:brightness-[1.02]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[VENUE_LAT, VENUE_LNG]} icon={icon} title={pillLabel} />
      </MapContainer>
    </div>
  );
};
