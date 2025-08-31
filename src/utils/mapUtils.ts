import { Station } from '../types/Train';

export const calculateDistance = (station1: Station, station2: Station): number => {
  // Simple distance calculation for demo purposes
  return Math.abs(parseInt(station1.distance) - parseInt(station2.distance));
};

export const getRouteProgress = (stations: Station[]): number => {
  const currentIndex = stations.findIndex(station => station.is_current_station);
  if (currentIndex === -1) return 0;
  
  return ((currentIndex + 1) / stations.length) * 100;
};

export const getEstimatedArrival = (station: Station): string => {
  // This would typically calculate based on current delay and distance
  // For demo purposes, we'll just return the scheduled time
  return station.timing;
};