import React, { useState } from 'react';
import { Search, Train, MapPin, Clock, Zap, Shield, Users } from 'lucide-react';

interface HomePageProps {
  onTrainSelect: (trainNumber: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onTrainSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const popularTrains = [
    { number: '12301', name: 'Rajdhani Express', route: 'New Delhi - Howrah' },
    { number: '12002', name: 'Shatabdi Express', route: 'New Delhi - Bhopal' },
    { number: '12951', name: 'Mumbai Rajdhani', route: 'Mumbai - New Delhi' },
    { number: '22691', name: 'Rajdhani Express', route: 'Bangalore - New Delhi' },
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track your train\'s exact location with live GPS updates'
    },
    {
      icon: Clock,
      title: 'Delay Notifications',
      description: 'Get instant alerts about delays and schedule changes'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning-fast updates with 99.9% uptime guarantee'
    },
    {
      icon: Shield,
      title: 'Accurate Data',
      description: 'Official railway data ensuring maximum accuracy'
    }
  ];

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsSearching(false);
    
    onTrainSelect(query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-500 p-4 rounded-2xl shadow-lg">
                <Train className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Track Your Train
              <span className="block text-blue-600">Live & Accurate</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get real-time updates on train locations, delays, and platform information. 
              Never miss your connection again.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter train number or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[60px]"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Button */}
            <button
              onClick={() => onTrainSelect('12301')}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try Live Demo
            </button>
          </div>
        </div>
      </div>

      {/* Popular Trains Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Routes
          </h2>
          <p className="text-lg text-gray-600">
            Quick access to frequently tracked trains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTrains.map((train, index) => (
            <div
              key={train.number}
              onClick={() => onTrainSelect(train.number)}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <Train className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{train.number}</div>
                  <div className="text-sm text-gray-500">Train Number</div>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {train.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {train.route}
              </p>
              
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <MapPin className="w-4 h-4 mr-1" />
                Track Now
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600">
              Advanced features designed for modern travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl mb-4 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Millions
            </h2>
            <p className="text-blue-100 text-lg">
              Join thousands of travelers who rely on our platform daily
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">2M+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">15K+</div>
              <div className="text-blue-100">Trains Tracked</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-2 rounded-lg mr-3">
                  <Train className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">TrainTracker</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your reliable companion for train journey tracking. 
                Real-time updates, accurate information, seamless experience.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Track Train</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PNR Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seat Availability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Train Schedule</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TrainTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};