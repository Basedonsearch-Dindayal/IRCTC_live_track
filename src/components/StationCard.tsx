import React from 'react';
import { Clock, MapPin, Timer, Train } from 'lucide-react';
import { Station } from '../types/Train';

interface StationCardProps {
  station: Station;
  index: number;
  isSelected: boolean;
  isPassed: boolean;
  onSelect: () => void;
  showDistance?: boolean;
  distanceFromPrevious?: number;
}

export const StationCard: React.FC<StationCardProps> = ({
  station,
  index,
  isSelected,
  isPassed,
  onSelect,
  showDistance = false,
  distanceFromPrevious = 0
}) => {
  const formatTiming = (timing: string) => {
    if (timing.length === 8 && timing.includes(':')) {
      const firstTime = timing.slice(0, 5);
      const secondTime = timing.slice(5);
      
      if (firstTime === secondTime) {
        return firstTime;
      } else {
        return `${firstTime} - ${secondTime}`;
      }
    }
    return timing;
  };

  const getDelayColor = (delay: string) => {
    if (delay.toLowerCase().includes('on time')) {
      return 'text-green-600 bg-green-50';
    } else if (delay.toLowerCase().includes('delayed')) {
      return 'text-red-600 bg-red-50';
    } else if (delay.toLowerCase().includes('expected')) {
      return 'text-amber-600 bg-amber-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="relative">
      {/* Distance Badge */}
      {showDistance && distanceFromPrevious > 0 && (
        <div className="absolute -top-2 left-4 text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200 shadow-sm">
          +{distanceFromPrevious}km
        </div>
      )}
      
      <div
        className={`relative ml-4 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
          station.is_current_station
            ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-200'
            : isSelected
            ? 'bg-gray-50 border-gray-300 shadow-sm'
            : isPassed
            ? 'bg-gray-25 border-gray-200 opacity-70'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`}
        onClick={onSelect}
      >
        {/* Timeline Circle */}
        <div
          className={`absolute -left-6 top-3 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            station.is_current_station
              ? 'bg-blue-500 border-blue-600 scale-125 shadow-lg'
              : isPassed
              ? 'bg-green-400 border-green-500'
              : 'bg-white border-gray-300'
          }`}
        >
          {station.is_current_station && (
            <>
              <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
              <Train className="absolute inset-0 w-2 h-2 text-white m-auto" />
            </>
          )}
        </div>

        {/* Station Content */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h4 className={`font-semibold text-sm leading-tight ${
                station.is_current_station ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {station.station_name}
              </h4>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {formatTiming(station.timing)}
              </div>
            </div>
            
            {station.is_current_station && (
              <div className="flex items-center bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                <Train className="w-3 h-3 mr-1" />
                Current
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className={`px-2 py-1 rounded-full font-medium ${getDelayColor(station.delay)}`}>
              {station.delay}
            </div>
            
            <div className="flex items-center space-x-3 text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                Plat {station.platform}
              </div>
              <div className="flex items-center">
                <Timer className="w-3 h-3 mr-1" />
                {station.halt === 'Source' || station.halt === 'Destination' ? station.halt : station.halt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};