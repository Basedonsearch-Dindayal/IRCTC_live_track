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
    const y = 25 + Math.sin(progress * Math.PI * 0.6) * 20 + progress * 30;
    return { x: Math.min(Math.max(x, 10), 90), y: Math.min(Math.max(y, 20), 80) };
  };

  // Generate smooth path
  const generatePath = () => {
    const points = stations.map((_, index) => getStationPosition(index));
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.4;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) * 0.4;
      const cp2y = curr.y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800 flex items-center">
            <Navigation className="w-4 h-4 mr-2 text-blue-500" />
            Route Map
          </h3>
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
            Live
          </div>
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 h-48">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '12px 12px'
          }}
        ></div>

        {/* Route SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset={`${((currentStationIndex + 1) / stations.length) * 100}%`} stopColor="#10B981" stopOpacity="0.9" />
              <stop offset={`${((currentStationIndex + 1) / stations.length) * 100}%`} stopColor="#CBD5E1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          
          {/* Route Path */}
          <path
            d={generatePath()}
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
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    <Train className="w-2 h-2 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
                </div>
              ) : (
                <div
                  className={`w-2 h-2 rounded-full border-2 shadow-sm transition-all duration-200 group-hover:scale-125 ${
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
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  {station.station_name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Progress Indicator */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 shadow-sm">
          <div className="text-xs font-medium text-gray-700">
            {Math.round(((currentStationIndex + 1) / stations.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};