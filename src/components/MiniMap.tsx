import React from 'react';
import { MapPin, Navigation, Train, Compass } from 'lucide-react';
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

  // Calculate positions for a realistic route layout
  const getStationPosition = (index: number) => {
    const progress = index / (stations.length - 1);
    // Create a more natural route curve
    const x = 15 + progress * 70;
    const y = 20 + Math.sin(progress * Math.PI * 0.8) * 15 + progress * 40;
    return { x: Math.min(Math.max(x, 10), 90), y: Math.min(Math.max(y, 15), 85) };
  };

  // Generate smooth path
  const generatePath = () => {
    const points = stations.map((_, index) => getStationPosition(index));
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.3;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) * 0.3;
      const cp2y = curr.y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-blue-500" />
            Route Map
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <Compass className="w-3 h-3 mr-1" />
            Live View
          </div>
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 h-64 overflow-hidden">
        {/* Map Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px'
          }}
        ></div>

        {/* Route SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset={`${((currentStationIndex + 1) / stations.length) * 100}%`} stopColor="#10B981" stopOpacity="0.8" />
              <stop offset={`${((currentStationIndex + 1) / stations.length) * 100}%`} stopColor="#CBD5E1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.6" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Route Path */}
          <path
            d={generatePath()}
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
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
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer group ${
                isSelected ? 'z-30' : isCurrentStation ? 'z-25' : 'z-20'
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              onClick={() => onStationSelect(index)}
            >
              {isCurrentStation ? (
                <div className="relative">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <Train className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
                </div>
              ) : (
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 shadow-sm transition-all duration-200 group-hover:scale-125 ${
                    isPassed 
                      ? 'bg-green-400 border-green-500' 
                      : 'bg-white border-gray-400'
                  } ${
                    isSelected ? 'ring-2 ring-blue-300 scale-110' : ''
                  }`}
                />
              )}
              
              {/* Station Name Tooltip */}
              <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                isSelected ? 'opacity-100' : ''
              }`}>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
                  {station.station_name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Compass Rose */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
          <Compass className="w-4 h-4 text-gray-600" />
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
          <div className="text-xs font-medium text-gray-700">
            {Math.round(((currentStationIndex + 1) / stations.length) * 100)}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};