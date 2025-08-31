import React from 'react';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  trainName: string;
  updatedTime: string;
}

export const Header: React.FC<HeaderProps> = ({ trainName, updatedTime }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {trainName}
        </h1>
        <div className="flex items-center text-sm md:text-base text-gray-600">
          <RefreshCw className="w-4 h-4 mr-2 text-blue-500" />
          <span>{updatedTime}</span>
        </div>
      </div>
    </header>
  );
};