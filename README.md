# Leaderboard Application

A full-stack leaderboard application built with React.js, Node.js, Express, and MongoDB.

## 🏗️ Project Structure

```
leaderboard-app/
├── client/                     # Frontend React application
├── server/                     # Backend Node.js/Express API
├── docs/                       # Project documentation
├── scripts/                    # Build and deployment scripts
├── .gitignore                  # Git ignore rules
├── .env.example               # Environment variables template
├── docker-compose.yml         # Docker configuration
├── package.json               # Root package.json for scripts
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd leaderboard-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install
   
   # Install server dependencies
   cd ../server && npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your MongoDB connection string
   ```

4. **Start Development**
   ```bash
   # From root directory - starts both client and server
   npm run dev
   
   # Or start individually:
   npm run dev:client    # Frontend only
   npm run dev:server    # Backend only
   ```

## 📁 Detailed Structure

### Client (Frontend)
- **components/**: Reusable UI components organized by type
- **pages/**: Route-level components
- **hooks/**: Custom React hooks
- **services/**: API calls and external service integrations
- **store/**: Global state management (Zustand)
- **utils/**: Helper functions and utilities

### Server (Backend)
- **controllers/**: Request handlers and business logic
- **models/**: Database schemas and models
- **routes/**: API route definitions
- **middleware/**: Custom middleware functions
- **services/**: Business logic and external integrations

## 🛠️ Available Scripts

```bash
npm run dev          # Start both client and server
npm run dev:client   # Start frontend development server
npm run dev:server   # Start backend development server
npm run build        # Build for production
npm run test         # Run all tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🔧 Technologies Used

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Zustand for state management
- Axios for API calls
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- CORS for cross-origin requests
- Environment variables with dotenv

## 📊 Features

- ✅ User management and leaderboard rankings
- ✅ Point claiming system with random rewards
- ✅ Real-time leaderboard updates
- ✅ Pagination for large user lists
- ✅ Responsive design for all devices
- ✅ Error handling and loading states

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker-compose up -d
```

## 📝 API Documentation

### Endpoints
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user
- `POST /api/claim/:userId` - Claim points for user
- `GET /api/leaderboard` - Get paginated leaderboard
- `GET /api/history` - Get claim history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.