import React from 'react';
import { StationCard } from './StationCard';
import { Station } from '../types/Train';
import { Route, Clock } from 'lucide-react';

interface TimelineProps {
  stations: Station[];
  selectedStationIndex: number;
  onStationSelect: (index: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  stations,
  selectedStationIndex,
  onStationSelect
}) => {
  const currentStationIndex = stations.findIndex(station => station.is_current_station);
  const currentStation = stations[currentStationIndex];
  const nextStation = stations[currentStationIndex + 1];

  const getDistanceFromPrevious = (index: number) => {
    if (index === 0) return 0;
    const current = parseInt(stations[index].distance);
    const previous = parseInt(stations[index - 1].distance);
    return current - previous;
  };

  return (
    <div className="space-y-4">
      {/* Current Status Card */}
      {currentStation && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Currently At</h3>
            <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
              Live
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{currentStation.station_name}</div>
          <div className="flex items-center text-blue-100 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            Platform {currentStation.platform} • {currentStation.delay}
          </div>
        </div>
      )}

      {/* Next Station Preview */}
      {nextStation && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="font-semibold text-amber-900 mb-1">Next Stop</h4>
          <div className="text-lg font-bold text-amber-800">{nextStation.station_name}</div>
          <div className="text-sm text-amber-700">
            Expected: {nextStation.timing.slice(0, 5)} • Platform {nextStation.platform}
          </div>
        </div>
      )}

      {/* Station Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Route className="w-5 h-5 mr-2 text-blue-500" />
            All Stations
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {stations.length} stops • Tap any station for details
          </p>
        </div>
        
        <div className="relative max-h-80 overflow-y-auto custom-scrollbar">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Progress Line */}
          <div 
            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-700 ease-out"
            style={{
              height: `${Math.min(((currentStationIndex + 1) / stations.length) * 100, 100)}%`
            }}
          ></div>

          <div className="p-4 space-y-2">
            {stations.map((station, index) => (
              <StationCard
                key={index}
                station={station}
                index={index}
                isSelected={selectedStationIndex === index}
                isPassed={index < currentStationIndex}
                onSelect={() => onStationSelect(index)}
                showDistance={index > 0}
                distanceFromPrevious={getDistanceFromPrevious(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};