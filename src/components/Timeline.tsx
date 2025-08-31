import React from 'react';
import { StationCard } from './StationCard';
import { Station } from '../types/Train';

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

  const getDistanceFromPrevious = (index: number) => {
    if (index === 0) return 0;
    const current = parseInt(stations[index].distance);
    const previous = parseInt(stations[index - 1].distance);
    return current - previous;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
        Station Timeline
      </h3>
      
      <div className="relative max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Vertical Timeline Line */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-200"></div>
        
        {/* Progress Line */}
        <div 
          className="absolute left-2 top-2 w-px bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-500"
          style={{
            height: `${((currentStationIndex + 1) / stations.length) * 100}%`
          }}
        ></div>

        <div className="space-y-2">
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
  );
};