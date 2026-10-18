import React, { useEffect, useRef, useState } from 'react';
import { X, Navigation, MapPin, Search, Layers, Compass } from 'lucide-react';
import L from 'leaflet';
import { GHATS_DATA, TEMPLES_DATA, PARKING_DATA } from '../data/pushkaraluData';

// Fix Leaflet's default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

export default function InteractiveMapModal({
  isOpen,
  onClose,
  initialTarget = null,
  lang = 'te'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [mapSearch, setMapSearch] = useState('');
  const [selectedPin, setSelectedPin] = useState(null);

  // Combine all verified locations
  const allLocations = [
    ...GHATS_DATA.map(g => ({
      ...g,
      category: 'ghat',
      catLabel: 'Bathing Ghat',
      markerColor: '#f97316'
    })),
    ...TEMPLES_DATA.map(t => ({
      ...t,
      category: 'temple',
      catLabel: 'Temple',
      markerColor: '#8b5cf6'
    })),
    ...PARKING_DATA.map(p => ({
      ...p,
      name: p.t,
      distance: 'Parking Zone',
      category: 'parking',
      catLabel: 'Parking Area',
      markerColor: '#0ea5e9'
    })),
    {
      id: 'medical-hq',
      name: 'Central 24x7 Medical HQ & ICU',
      catLabel: 'Emergency & Medical',
      category: 'medical',
      lat: 16.9945,
      lng: 81.7785,
      distance: 'Saraswati Ghat',
      markerColor: '#ef4444'
    }
  ];

  // Initialize or re-center map when opened
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const center = initialTarget ? [initialTarget.lat, initialTarget.lng] : [17.0050, 81.7750];
      const zoom = initialTarget ? 15 : 14;

      const map = L.map(mapContainerRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Govt of AP GIS',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
        if (initialTarget) {
          mapInstanceRef.current?.setView([initialTarget.lat, initialTarget.lng], 16);
        }
      }, 200);
    }

    return () => {
      // Keep instance until modal unmounts
    };
  }, [isOpen, initialTarget]);

  // Update Markers based on Category and Search
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    const filtered = allLocations.filter(loc => {
      const matchesCat = activeCategory === 'all' || loc.category === activeCategory;
      const matchesSearch = !mapSearch || loc.name.toLowerCase().includes(mapSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });

    filtered.forEach(loc => {
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="background-color: ${loc.markerColor}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">
            📍
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: inherit; padding: 4px;">
          <strong style="font-size: 14px; color: #111;">${loc.name}</strong>
          <div style="font-size: 11px; color: #666; margin-top: 2px;">${loc.catLabel} · ${loc.distance || ''}</div>
          <p style="font-size: 11px; margin-top: 4px; color: #444;">${loc.description || loc.location || 'Verified Pushkaralu 2027 Point'}</p>
        </div>
      `);

      marker.on('click', () => {
        setSelectedPin(loc);
      });

      markersRef.current.push(marker);
    });

    if (initialTarget) {
      setSelectedPin(initialTarget);
    }
  }, [isOpen, activeCategory, mapSearch, initialTarget]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-md animate-fade-in text-foreground">
      <div className="relative flex flex-col h-[94vh] w-full max-w-6xl rounded-3xl bg-card border border-border shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border/70 p-4 bg-background/80 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-sunrise text-white">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                Godavari Pushkaralu GIS Interactive Map
              </h3>
              <p className="text-xs text-muted-foreground">
                Rajahmundry Verified Coordinates · Bathing Ghats, Temples, Parking & Aid Posts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-secondary/30 border-b border-border/50 text-xs">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Verified Points' },
              { id: 'ghat', label: 'Bathing Ghats (4)' },
              { id: 'temple', label: 'Temples (3)' },
              { id: 'parking', label: 'Parking Lots (4)' },
              { id: 'medical', label: 'Medical Camps' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-3 py-1 font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'gradient-sunrise text-white shadow-sm'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search inside map */}
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 shadow-sm w-full sm:w-64">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              placeholder="Search map pin..."
              className="w-full bg-transparent outline-none text-xs"
            />
            {mapSearch && (
              <button onClick={() => setMapSearch('')} className="text-muted-foreground">
                ×
              </button>
            )}
          </div>
        </div>

        {/* Leaflet Map & Info Side Panel */}
        <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Real Leaflet Map */}
          <div ref={mapContainerRef} className="h-full flex-1 z-0 bg-muted"></div>

          {/* Pin Details Drawer */}
          {selectedPin && (
            <div className="w-full md:w-80 bg-card border-t md:border-t-0 md:border-l border-border p-4 overflow-y-auto shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-saffron">
                    {selectedPin.catLabel || 'Selected Facility'}
                  </span>
                  <button onClick={() => setSelectedPin(null)} className="text-muted-foreground text-xs">
                    Dismiss
                  </button>
                </div>

                <h4 className="font-display text-lg font-bold text-foreground">
                  {selectedPin.name}
                </h4>

                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>GPS: {selectedPin.lat?.toFixed(4)}, {selectedPin.lng?.toFixed(4)}</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-foreground/80">
                  {selectedPin.description || selectedPin.details || selectedPin.location || 'Verified point along the sacred Godavari river corridor.'}
                </p>

                {selectedPin.facilities && (
                  <div className="mt-3">
                    <div className="text-[11px] font-bold text-muted-foreground mb-1">Highlights:</div>
                    <ul className="text-xs space-y-1">
                      {selectedPin.facilities.slice(0, 4).map((f, i) => (
                        <li key={i} className="text-foreground/90">✓ {f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-border/50">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPin.lat},${selectedPin.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full gradient-sunrise py-2.5 text-xs font-semibold text-white shadow-glow"
                >
                  <Navigation className="h-4 w-4" /> Open in Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
