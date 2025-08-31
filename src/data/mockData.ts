import { TrainData } from '../types/Train';

export const mockTrainData: TrainData = {
  train_name: "Rajdhani Express 12301",
  updated_time: "Last updated: 14:32 IST",
  data: [
    {
      is_current_station: false,
      station_name: "New Delhi",
      timing: "06:0006:00",
      delay: "On Time",
      platform: "4",
      halt: "Source",
      distance: "0",
      coordinates: { lat: 28.6448, lng: 77.2167 }
    },
    {
      is_current_station: false,
      station_name: "Kanpur Central",
      timing: "12:1512:20",
      delay: "On Time",
      platform: "3",
      halt: "5min",
      distance: "441",
      coordinates: { lat: 26.4499, lng: 80.3319 }
    },
    {
      is_current_station: true,
      station_name: "Allahabad Junction",
      timing: "14:1014:15",
      delay: "Delayed by 8min",
      platform: "6",
      halt: "5min",
      distance: "634",
      coordinates: { lat: 25.4358, lng: 81.8463 }
    },
    {
      is_current_station: false,
      station_name: "Varanasi Junction",
      timing: "16:2516:30",
      delay: "Expected Delay 12min",
      platform: "2",
      halt: "5min",
      distance: "781",
      coordinates: { lat: 25.3176, lng: 82.9739 }
    },
    {
      is_current_station: false,
      station_name: "Patna Junction",
      timing: "19:4519:50",
      delay: "Expected On Time",
      platform: "7",
      halt: "5min",
      distance: "1038",
      coordinates: { lat: 25.5941, lng: 85.1376 }
    },
    {
      is_current_station: false,
      station_name: "Howrah Junction",
      timing: "23:4523:45",
      delay: "Expected On Time",
      platform: "9",
      halt: "Destination",
      distance: "1447",
      coordinates: { lat: 22.5828, lng: 88.3426 }
    }
  ]
};