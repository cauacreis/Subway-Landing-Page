"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapStore {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  distance: string;
  hours: string;
  hasDriveThru: boolean;
  phone: string;
  lat: number;
  lng: number;
}

interface InteractiveMapProps {
  stores: MapStore[];
  selectedStore: MapStore;
  onSelectStore: (store: MapStore) => void;
}

export default function InteractiveMap({
  stores,
  selectedStore,
  onSelectStore,
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [selectedStore.lat, selectedStore.lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    // CartoDB Dark Matter tile layer for an ultra-sleek dark aesthetic
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    // Custom Zoom control in top right
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Markers and Handle Selection
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    stores.forEach((store) => {
      const isSelected = store.id === selectedStore.id;

      // Custom animated SVG/HTML icon for Subway Pins
      const iconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${
            isSelected
              ? `<span class="absolute -inset-2 rounded-full bg-[#FFC20E]/40 animate-ping"></span>
                 <span class="absolute -inset-1 rounded-full bg-emerald-500/30 blur-sm"></span>`
              : ""
          }
          <div class="relative flex items-center justify-center w-10 h-10 rounded-full shadow-2xl transition-transform duration-300 group-hover:scale-110 ${
            isSelected
              ? "bg-[#0b2413] border-2 border-[#FFC20E] ring-4 ring-yellow-400/50 scale-110"
              : "bg-[#06180d] border-2 border-emerald-500/50 ring-2 ring-white/20"
          }">
            <img src="/images/icons/subway_symbol.png" alt="Subway" class="w-6 h-6 object-contain drop-shadow" />
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-white/10 text-[9px] font-mono text-white whitespace-nowrap shadow-md pointer-events-none">
            ${store.name.replace("Subway® ", "")}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: "subway-map-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
      });

      const marker = L.marker([store.lat, store.lng], { icon: customIcon })
        .addTo(map)
        .on("click", () => {
          onSelectStore(store);
        });

      // Custom popup
      const popupHtml = `
        <div style="background: #09150d; color: #fff; padding: 12px; border-radius: 12px; border: 1px solid rgba(0, 140, 21, 0.4); font-family: inherit; min-width: 180px;">
          <h4 style="font-weight: 800; font-size: 13px; color: #FFC20E; margin: 0 0 4px 0;">${store.name}</h4>
          <p style="font-size: 11px; color: #94a3b8; margin: 0 0 6px 0;">${store.address}</p>
          <span style="font-size: 10px; color: #10b981; font-weight: bold;">● ${store.hours}</span>
        </div>
      `;
      marker.bindPopup(popupHtml, {
        className: "subway-dark-popup",
        closeButton: false,
      });

      markersRef.current[store.id] = marker;
    });
  }, [stores, selectedStore, onSelectStore]);

  // Smoothly FlyTo selected store when selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.flyTo([selectedStore.lat, selectedStore.lng], 15, {
      animate: true,
      duration: 1.2,
    });

    const activeMarker = markersRef.current[selectedStore.id];
    if (activeMarker) {
      activeMarker.openPopup();
    }
  }, [selectedStore]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px] z-0" />

      {/* Global CSS overrides for Leaflet dark styling */}
      <style jsx global>{`
        .leaflet-container {
          background: #09150d !important;
          outline: none;
        }
        .subway-map-marker {
          background: transparent !important;
          border: none !important;
        }
        .subway-dark-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8) !important;
          padding: 0 !important;
          border-radius: 12px !important;
        }
        .subway-dark-popup .leaflet-popup-tip {
          background: #09150d !important;
          border: 1px solid rgba(0, 140, 21, 0.4);
        }
        .leaflet-bar {
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-radius: 10px !important;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6) !important;
        }
        .leaflet-bar a {
          background-color: rgba(9, 21, 13, 0.85) !important;
          color: #fff !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }
        .leaflet-bar a:hover {
          background-color: #008C15 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
