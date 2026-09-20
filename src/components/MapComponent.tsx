import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { ActivityItem, Location } from '../types';
import { Navigation, Clock, MapPin, DollarSign } from 'lucide-react';

interface MapComponentProps {
  activities: ActivityItem[];
  selectedActivityId?: string;
  onSelectActivity?: (activityId: string) => void;
  hotelLocation?: Location;
  center?: [number, number];
  zoom?: number;
  height?: string;
  showRouteLines?: boolean;
}

// Helper to re-center map dynamically
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

export const MapComponent: React.FC<MapComponentProps> = ({
  activities,
  selectedActivityId,
  onSelectActivity,
  hotelLocation = { name: 'Hotel Shibuya Stream', address: 'Shibuya, Tokyo', lat: 35.658, lng: 139.7016, city: 'Tokyo' },
  center = [35.668, 139.725],
  zoom = 13,
  height = '100%',
  showRouteLines = true
}) => {
  const mapRef = useRef<L.Map | null>(null);

  // Active or focused activity center
  const activeActivity = activities.find((a) => a.id === selectedActivityId);
  const currentCenter: [number, number] = activeActivity
    ? [activeActivity.location.lat, activeActivity.location.lng]
    : center;

  // Build route polyline points (hotel -> act1 -> act2 ...)
  const routePoints: [number, number][] = [];
  if (hotelLocation) {
    routePoints.push([hotelLocation.lat, hotelLocation.lng]);
  }
  activities.forEach((act) => {
    routePoints.push([act.location.lat, act.location.lng]);
  });

  // Create custom Leaflet HTML DivIcon for Numbered Activity Pins
  const createActivityIcon = (num: number, isSelected: boolean, category: string) => {
    const isNow = category === 'now';
    const bgClass = isSelected
      ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 scale-110'
      : isNow
      ? 'bg-amber-600 text-white ring-4 ring-amber-200 animate-pulse'
      : 'bg-slate-900 text-white hover:bg-emerald-700';

    return L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full ${bgClass} shadow-md flex items-center justify-center font-bold text-xs transition-all cursor-pointer border border-white">
            ${num}
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-slate-900 rotate-45"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  // Create custom Hotel Icon
  const createHotelIcon = () => {
    return L.divIcon({
      className: 'custom-hotel-marker',
      html: `
        <div class="w-9 h-9 rounded-full bg-teal-800 text-white shadow-lg flex items-center justify-center font-bold text-sm border-2 border-white">
          🏨
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });
  };

  return (
    <div style={{ height }} className="relative w-full overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
      <MapContainer
        center={currentCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        ref={mapRef}
      >
        <MapController center={currentCenter} zoom={zoom} />
        
        {/* CartoDB Positron modern light map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Hotel Marker */}
        {hotelLocation && (
          <Marker position={[hotelLocation.lat, hotelLocation.lng]} icon={createHotelIcon()}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">Base Hotel</div>
                <h4 className="font-bold text-slate-900 text-sm">{hotelLocation.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{hotelLocation.address}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Activity Markers */}
        {activities.map((act, index) => {
          const isSelected = act.id === selectedActivityId;
          const markerIcon = createActivityIcon(index + 1, isSelected, act.isNow ? 'now' : act.category);

          return (
            <Marker
              key={act.id}
              position={[act.location.lat, act.location.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => {
                  if (onSelectActivity) onSelectActivity(act.id);
                }
              }}
            >
              <Popup>
                <div className="p-2 min-w-[220px]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700">
                      Item #{index + 1} · {act.time}
                    </span>
                    {act.bookingStatus === 'confirmed' && (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        ✓ Confirmed
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{act.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{act.location.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{act.durationMinutes} min</span>
                    </div>
                    {act.travelTimeFromPrevMinutes && (
                      <div className="flex items-center gap-1 text-slate-600">
                        <Navigation className="w-3 h-3 text-slate-400" />
                        <span>{act.travelTimeFromPrevMinutes}m travel</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-slate-700 font-semibold col-span-2">
                      <DollarSign className="w-3 h-3 text-slate-400" />
                      <span>₹{act.costINR.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {onSelectActivity && (
                    <button
                      onClick={() => onSelectActivity(act.id)}
                      className="mt-3 w-full py-1.5 bg-slate-900 hover:bg-teal-700 text-white font-medium text-xs rounded-lg transition-colors"
                    >
                      View Details & Route
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Polylines for day routes */}
        {showRouteLines && routePoints.length > 1 && (
          <Polyline
            positions={routePoints}
            pathOptions={{
              color: '#0f766e',
              weight: 4,
              opacity: 0.85,
              dashArray: '8, 8'
            }}
          />
        )}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200/80 shadow-md text-xs text-slate-700 z-[400] flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-800"></span>
          <span className="font-medium text-[11px]">Hotel Base</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
          <span className="font-medium text-[11px]">Activity</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
          <span className="font-medium text-[11px]">Now</span>
        </div>
        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
          <span className="w-4 h-0.5 bg-teal-700 border-b border-dashed border-teal-700"></span>
          <span className="font-medium text-[11px]">Route</span>
        </div>
      </div>
    </div>
  );
};
