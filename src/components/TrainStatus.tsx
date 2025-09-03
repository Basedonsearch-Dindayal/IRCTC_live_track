import { AlertCircle, ArrowLeft, Clock, MapPin, RefreshCw, Train } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { mockTrainData } from '../data/mockData';
import { ApiResponse, fetchTrainData } from '../services/trainApi';
import { MiniMap } from './MiniMap';
import { Timeline } from './Timeline';

interface TrainStatusProps {
  trainNumber: string;
  onBack: () => void;
}

export const TrainStatus: React.FC<TrainStatusProps> = ({ trainNumber, onBack }) => {
  const [trainData, setTrainData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStationIndex, setSelectedStationIndex] = useState<number>(
    mockTrainData.data.findIndex(station => station.is_current_station)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);


  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTrainData();
    setIsRefreshing(false);
  };

  const loadTrainData = async () => {
    try {
      setError(null);
      const data = await fetchTrainData(trainNumber);
      setTrainData(data);
      
      // Set selected station to current station
      const currentIndex = data.data.findIndex(station => station.is_current_station);
      setSelectedStationIndex(currentIndex >= 0 ? currentIndex : 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load train data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainData();
  }, [trainNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Train Data</h2>
          <p className="text-gray-500">Fetching live information for train {trainNumber}...</p>
        </div>
      </div>
    );
  }

  if (error || !trainData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Train Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                loadTrainData();
              }}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStation = trainData.data.find(station => station.is_current_station);
  const totalDistance = trainData.data[trainData.data.length - 1].distance;
  const currentDistance = currentStation?.distance || '0';
  const progressPercentage = Math.round((parseInt(currentDistance) / parseInt(totalDistance)) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {trainData.train_name}
                </h1>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{trainData.updated_time}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Journey Progress</span>
              <Train className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{progressPercentage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Distance Covered</span>
              <MapPin className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{currentDistance}km</div>
            <div className="text-sm text-gray-500">of {totalDistance}km total</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Current Status</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className={`text-lg font-bold ${
              currentStation?.delay.toLowerCase().includes('on time') ? 'text-green-600' :
              currentStation?.delay.toLowerCase().includes('delayed') ? 'text-red-600' : 'text-amber-600'
            }`}>
              {currentStation?.delay || 'Unknown'}
            </div>
            <div className="text-sm text-gray-500">Last updated</div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Timeline - Takes 2/3 on large screens */}
          <div className="lg:col-span-3">
            <Timeline
              stations={trainData.data.map(station => ({
                ...station,
                coordinates: station.coordinates || { lat: 0, lng: 0 }
              }))}
              selectedStationIndex={selectedStationIndex}
              onStationSelect={setSelectedStationIndex}
            />
          </div>

          {/* Sidebar - Takes 1/3 on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <MiniMap
              stations={trainData.data.map(station => ({
                ...station,
                coordinates: station.coordinates || { lat: 0, lng: 0 }
              }))}
              selectedStationIndex={selectedStationIndex}
              onStationSelect={setSelectedStationIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};