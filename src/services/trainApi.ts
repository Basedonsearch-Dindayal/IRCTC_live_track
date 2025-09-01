export interface ApiResponse {
  train_name: string;
  updated_time: string;
  data: {
    is_current_station: boolean;
    station_name: string;
    timing: string;
    delay: string;
    platform: string;
    halt: string;
    distance: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }[];
}

export const fetchTrainData = async (trainNumber: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://rappid.in/apis/train.php?train_no=${trainNumber}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Add mock coordinates if not provided by API
    const dataWithCoordinates = data.data.map((station: any, index: number) => ({
      ...station,
      coordinates: station.coordinates || {
        lat: 28.6 + (index * 0.5) - (index * 0.1),
        lng: 77.2 + (index * 0.8) - (index * 0.2)
      }
    }));
    
    return {
      ...data,
      data: dataWithCoordinates
    };
  } catch (error) {
    console.error('Error fetching train data:', error);
    throw new Error('Failed to fetch train data. Please check the train number and try again.');
  }
};