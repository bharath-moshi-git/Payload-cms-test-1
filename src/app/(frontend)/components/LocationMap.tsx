import React from 'react';

export interface NearbyPlace {
  name: string;
  distance?: string | null;
  id?: string | null;
}

interface LocationMapProps {
  heading?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  nearbyPlaces?: NearbyPlace[] | null;
}

const defaultPlaces: NearbyPlace[] = [
  { name: 'Coorg Golf Links', distance: '12 mins drive' },
  { name: 'Abbey Waterfalls', distance: '25 mins drive' },
  { name: 'District General Hospital', distance: '15 mins drive' },
  { name: 'Kannur International Airport', distance: '90 mins drive' },
];

const getEmbedMapUrl = (url: string | null | undefined, address?: string | null): string => {
  if (!url) {
    if (address) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
    return '';
  }

  // If it's already an embed link, return as is
  if (url.includes('/embed') || url.includes('output=embed')) {
    return url;
  }

  // If it's a standard Google Maps share link, parse query or coordinates
  try {
    if (url.includes('/place/')) {
      const parts = url.split('/place/');
      if (parts[1]) {
        const placeName = parts[1].split('/')[0];
        return `https://maps.google.com/maps?q=${placeName}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
      }
    }

    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
  } catch (e) {
    console.error('Error parsing Google Maps URL:', e);
  }

  if (address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
};

const LocationMap: React.FC<LocationMapProps> = ({
  heading = 'Location & Map',
  address = 'AARDE Coffee Hill Estates, Madikeri, Coorg, Karnataka - 571201',
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124838.7495029311!2d75.6548545805561!3d12.411130397576558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5aa1459f375bb%3A0xe21287c9751e18d6!2sMadikeri%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  latitude = 12.4244,
  longitude = 75.7382,
  nearbyPlaces,
}) => {
  const displayPlaces = nearbyPlaces && nearbyPlaces.length > 0 ? nearbyPlaces : defaultPlaces;

  return (
    <section className="py-28 bg-[#080B10] border-t border-white/10 relative overflow-hidden" id="location">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E2C08D] uppercase block">
              [ 04 // LOCATION & TRANSIT ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-slate-100 tracking-tight">
              {heading || 'Location & Map'}
            </h2>
          </div>
          {address && (
            <p className="text-slate-400 text-sm font-sans max-w-md leading-relaxed">
              {address}
            </p>
          )}
        </div>

        {/* Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Embed Frame */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-white/10 h-[500px] relative bg-slate-900 shadow-2xl">
            {(mapUrl || address) ? (
              <iframe
                src={getEmbedMapUrl(mapUrl, address)}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            ) : (
              <div className="h-full w-full flex flex-col justify-center items-center p-8 text-center text-slate-500 font-sans">
                <span className="text-5xl mb-4">📍</span>
                <p className="text-lg font-semibold text-slate-300">Map View Available in Production</p>
                <p className="text-xs mt-2 text-slate-500">
                  Coordinates: {latitude}° N, {longitude}° E
                </p>
              </div>
            )}
          </div>

          {/* Transit & Proximity */}
          <div className="awwwards-card rounded-3xl p-8 flex flex-col justify-between h-[500px] overflow-y-auto scrollbar-thin">
            <div>
              <span className="font-mono text-xs text-[#E2C08D] uppercase tracking-widest block mb-6">
                PROXIMITY RADAR
              </span>
              <h3 className="text-2xl font-serif font-light text-slate-100 mb-6">
                Key Destinations
              </h3>

              <div className="space-y-6">
                {displayPlaces.map((place, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <span className="text-slate-300 font-sans text-sm font-medium">{place.name}</span>
                    <span className="font-mono text-xs text-[#E2C08D]">{place.distance || 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-slate-400">
              Coordinates: {latitude} / {longitude}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
