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
      return 'text-green-700 bg-green-100 border-green-200';
    } else if (delay.toLowerCase().includes('delayed')) {
      return 'text-red-700 bg-red-100 border-red-200';
    } else if (delay.toLowerCase().includes('expected')) {
      return 'text-amber-700 bg-amber-100 border-amber-200';
    }
    return 'text-gray-700 bg-gray-100 border-gray-200';
  };

  return (
    <div className="relative">
      {/* Distance Badge */}
      {showDistance && distanceFromPrevious > 0 && (
        <div className="absolute -top-1 left-3 text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200 shadow-sm z-10">
          +{distanceFromPrevious}km
        </div>
      )}
      
      <div
        className={`relative ml-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
          station.is_current_station
            ? 'bg-blue-50 border-blue-200 shadow-sm'
            : isSelected
            ? 'bg-gray-50 border-gray-300'
            : isPassed
            ? 'bg-gray-25 border-gray-200 opacity-60'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`}
        onClick={onSelect}
      >
        {/* Timeline Circle */}
        <div
          className={`absolute -left-5 top-4 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
            station.is_current_station
              ? 'bg-blue-500 border-blue-600 scale-125'
              : isPassed
              ? 'bg-green-400 border-green-500'
              : 'bg-white border-gray-300'
          }`}
        >
          {station.is_current_station && (
            <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
          )}
        </div>

        {/* Compact Station Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium text-sm ${
              station.is_current_station ? 'text-blue-900' : 'text-gray-900'
            }`}>
              {station.station_name}
            </h4>
            
            {station.is_current_station && (
              <div className="flex items-center bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                <Train className="w-2.5 h-2.5 mr-1" />
                Live
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-gray-600">
              <Clock className="w-3 h-3 mr-1" />
              {formatTiming(station.timing)}
            </div>
            
            <div className={`px-2 py-0.5 rounded border text-xs font-medium ${getDelayColor(station.delay)}`}>
              {station.delay}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              Platform {station.platform}
            </div>
            <div className="flex items-center">
              <Timer className="w-3 h-3 mr-1" />
              {station.halt === 'Source' || station.halt === 'Destination' ? station.halt : `${station.halt} halt`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};