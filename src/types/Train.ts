export interface Station {
  is_current_station: boolean;
  station_name: string;
  timing: string;
  delay: string;
  platform: string;
  halt: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TrainData {
  train_name: string;
  updated_time: string;
  data: Station[];
}