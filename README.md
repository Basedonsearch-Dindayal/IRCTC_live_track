# 🚂 TrainTracker - Live Train Status & Real-time Tracking

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://your-demo-url.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

> **Track trains in real-time with accurate delays, platform info, and interactive route maps. Never miss your connection again!**

![TrainTracker Homepage](https://github.com/user-attachments/assets/095659dd-2fde-450c-a866-7dbb6fc1a818)

## ✨ Features

### 🚀 **Real-time Tracking**
- **Live GPS Updates**: Track your train's exact location with precision
- **Station Progress**: See current station, upcoming stops, and completed journey
- **Interactive Timeline**: Visual representation of your train's journey

### ⏰ **Smart Notifications**
- **Delay Alerts**: Instant notifications about schedule changes
- **Platform Information**: Real-time platform assignments
- **Arrival/Departure Times**: Updated schedules with delay calculations

### 🎯 **User Experience**
- **Fast Search**: Quick train lookup by number or name
- **Popular Routes**: One-click access to frequently tracked trains
- **Responsive Design**: Perfect experience on mobile, tablet, and desktop
- **Modern UI**: Clean, intuitive interface with gradient backgrounds

### 📊 **Comprehensive Data**
- **Station Details**: Halt duration, distance, and coordinates
- **Route Visualization**: Complete journey mapping
- **Official IRCTC Data**: Accurate information from Indian Railways

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 7.1.3 for lightning-fast development
- **Styling**: Tailwind CSS 3.4.1 for responsive design
- **Icons**: Lucide React for beautiful, consistent icons
- **Code Quality**: ESLint with TypeScript support
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Basedonsearch-Dindayal/Live-train-status-IRCTC.git
   cd Live-train-status-IRCTC
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.tsx     # Landing page with search
│   ├── TrainStatus.tsx  # Train tracking display
│   ├── Timeline.tsx     # Journey progress timeline
│   ├── StationCard.tsx  # Individual station information
│   ├── MiniMap.tsx      # Route visualization
│   └── Header.tsx       # Navigation header
├── services/            # API and external services
│   └── trainApi.ts      # Train data fetching logic
├── types/               # TypeScript type definitions
│   └── Train.ts         # Train and station interfaces
├── data/                # Static data and configurations
├── utils/               # Utility functions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🔌 API Integration

The application integrates with train data APIs to provide real-time information:

```typescript
// Example API usage
import { fetchTrainData } from './services/trainApi';

const trainData = await fetchTrainData('12301'); // Rajdhani Express
```

### API Response Structure
```typescript
interface TrainData {
  train_name: string;
  updated_time: string;
  data: Station[];
}

interface Station {
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
```

## 🎨 UI Components

### HomePage
- Hero section with search functionality
- Popular train routes for quick access
- Feature highlights and statistics
- Responsive footer with navigation links

### TrainStatus
- Real-time train position tracking
- Station-wise journey progress
- Delay information and platform details
- Interactive timeline visualization

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: Touch-friendly interface with optimized layouts
- **Tablet**: Enhanced spacing and improved navigation
- **Desktop**: Full-featured experience with detailed information

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain responsive design principles
- Write clean, self-documenting code
- Test your changes across different devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Indian Railways** for providing train data
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for beautiful icons
- **Vite** for the excellent build tooling

## 📞 Support

- 🐛 **Bug Reports**: [Create an issue](https://github.com/Basedonsearch-Dindayal/Live-train-status-IRCTC/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/Basedonsearch-Dindayal/Live-train-status-IRCTC/discussions)
- 📧 **Email**: [Contact Us](mailto:support@traintracker.com)

---

<p align="center">
  <strong>Built with ❤️ for Indian Railway travelers</strong>
</p>

<p align="center">
  <a href="#-traintracker---live-train-status--real-time-tracking">⬆️ Back to top</a>
</p>
