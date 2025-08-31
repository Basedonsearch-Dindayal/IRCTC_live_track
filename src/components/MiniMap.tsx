import React from 'react';
import { MapPin, Navigation, Train } from 'lucide-react';
import { Station } from '../types/Train';

interface MiniMapProps {
  stations: Station[];
  selectedStationIndex: number;
  onStationSelect: (index: number) => void;
}

export const MiniMap: React.FC<MiniMapProps> = ({ 
  stations, 
  selectedStationIndex, 
  onStationSelect 
}) => {
  const currentStationIndex = stations.findIndex(station => station.is_current_station);

  // Calculate positions for a more realistic route layout
  const getStationPosition = (index: number) => {
    const progress = index / (stations.length - 1);
    // Create a more natural curved route
    const x = 20 + progress * 60;
    const y = 25 + Math.sin(progress * Math.PI * 0.6) * 20 + progress * 30;
    return { x, y };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Navigation className="w-4 h-4 mr-2 text-blue-500" />
          Route Overview
        </h3>
        <div className="text-xs text-gray-500">
          Interactive Map
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-40 overflow-hidden border border-blue-100">
        {/* Route Path */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset={`${((currentStationIndex + 1) / stations.length) * 100}%`} stopColor="#10B981" />
              <stop offset={`${((currentStationIndex + 1) / stations.length) * 100}%`} stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
          
          <path
            d={`M ${stations.map((_, index) => {
              const pos = getStationPosition(index);
              return `${index === 0 ? 'M' : 'L'} ${pos.x}% ${pos.y}%`;
            }).join(' ')}`}
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Station Markers */}
        {stations.map((station, index) => {
          const pos = getStationPosition(index);
          const isCurrentStation = station.is_current_station;
          const isSelected = index === selectedStationIndex;
          const isPassed = index < currentStationIndex;

          return (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer group ${
                isSelected ? 'z-30' : 'z-20'
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              onClick={() => onStationSelect(index)}
            >
              {isCurrentStation ? (
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Train className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
                </div>
              ) : (
                <div
                  className={`w-3 h-3 rounded-full border-2 shadow-sm transition-all duration-200 group-hover:scale-125 ${
                    isPassed 
                      ? 'bg-green-400 border-green-500' 
                      : 'bg-white border-gray-400'
                  } ${
                    isSelected ? 'ring-2 ring-blue-300 scale-110' : ''
                  }`}
                />
              )}
              
              {/* Station Name Tooltip */}
              <div className={`absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                isSelected ? 'opacity-100' : ''
              }`}>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  {station.station_name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Compass */}
        <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-sm">
          <Navigation className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
};