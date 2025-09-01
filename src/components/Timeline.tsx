import React from 'react';
import { StationCard } from './StationCard';
import { Station } from '../types/Train';
import { Route, Clock, MapPin } from 'lucide-react';

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
      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Station */}
        {currentStation && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Currently At</h3>
              <div className="bg-white/20 rounded-full px-2 py-1 text-xs font-medium">
                Live
              </div>
            </div>
            <div className="text-xl font-bold mb-1">{currentStation.station_name}</div>
            <div className="flex items-center text-blue-100 text-sm">
              <MapPin className="w-3 h-3 mr-1" />
              Platform {currentStation.platform} • {currentStation.delay}
            </div>
          </div>
        )}

        {/* Next Station */}
        {nextStation && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-1">Next Stop</h4>
            <div className="text-lg font-bold text-amber-800">{nextStation.station_name}</div>
            <div className="text-sm text-amber-700 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {nextStation.timing.slice(0, 5)} • Platform {nextStation.platform}
            </div>
          </div>
        )}
      </div>

      {/* Compact Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-3 border-b border-gray-100 bg-gray-50">
          <h3 className="font-medium text-gray-800 flex items-center">
            <Route className="w-4 h-4 mr-2 text-blue-500" />
            Route Timeline
          </h3>
        </div>
        
        <div className="relative max-h-64 overflow-y-auto custom-scrollbar">
          {/* Vertical Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Progress Line */}
          <div 
            className="absolute left-5 top-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-700 ease-out"
            style={{
              height: `${Math.min(((currentStationIndex + 1) / stations.length) * 100, 100)}%`
            }}
          ></div>

          <div className="p-3 space-y-1">
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