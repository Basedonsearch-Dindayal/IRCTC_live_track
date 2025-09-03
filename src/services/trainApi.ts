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
    if (!trainNumber || trainNumber.trim() === "") {
      throw new Error("Train number is required.");
    }
  const response = await fetch(`/apis/train.php?train_no=${trainNumber}`);//api here
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API raw response:", data);
    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error("No train data found for this train number.");
    }
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