# 🌏 ExploreSEAsia

A comprehensive travel exploration platform designed to help users discover, plan, and share their Southeast Asian adventures.

[Live Website](https://explore-se-asia.web.app/) | [GitHub Repository](https://github.com/kawsar12759/explore-se-asia)

---

## 📖 Project Overview

**ExploreSEAsia** is a full-stack web application that empowers travelers to explore beautiful destinations across Southeast Asia. The platform provides detailed destination information, user-generated content, personalized itineraries, weather insights, and community reviews—all wrapped in a modern, responsive interface.

Whether you're planning a vacation, looking for cultural landmarks, or discovering hidden gems, ExploreSEAsia makes it easy to research, plan, and share your travel experiences.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library built on Tailwind CSS
- **Vite** - Build tool for fast development
- **Firebase** - Authentication & Hosting
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **SweetAlert2** - Beautiful alert dialogs
- **ESLint** - Code linting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Firebase Admin SDK** - Backend authentication
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management
- **Vercel** - Deployment platform

---

## ✨ Key Features

### User Features
- 🔍 **Explore Destinations** - Browse and search tourist spots across Southeast Asia with filtering options
- 📝 **Create & Manage Content** - Add, update, and delete your favorite destinations
- 👤 **User Profiles** - Create profiles and manage your personal information
- 🔒 **Secure Authentication** - Sign up and login with Firebase authentication
- 🔐 **Protected Routes** - Access restricted features only when authenticated

### Destination Features
- 📌 **Detailed Spot Information** - View comprehensive information about each location
- 🖼️ **Image Gallery** - Browse beautiful photo collections of destinations
- ⭐ **Community Reviews** - Read and contribute reviews for spots
- 🌤️ **Weather Information** - Check weather conditions before planning visits
- 📅 **Best Time to Visit** - Get recommendations on optimal visiting periods
- 🗺️ **Similar Spots** - Discover related destinations

### Travel Planning
- ✈️ **Itinerary Creation** - Build and customize your travel itineraries
- 📋 **Itinerary Management** - Create, view, and manage multiple itineraries
- ❤️ **My List** - Save and organize your favorite spots

### Design
- 🌐 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🎨 **Modern UI** - Clean and intuitive user interface
- ⚡ **Fast Performance** - Optimized loading and smooth interactions

---

## 📁 Project Structure

```
explore-se-asia/
├── explore-se-asia-client/          # React frontend application
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── AddSpot/            # Add new destination form
│   │   │   ├── AllSpot/            # Browse all destinations
│   │   │   ├── Banner/             # Hero banner section
│   │   │   ├── BestTimeToVisit/    # Seasonal recommendations
│   │   │   ├── Featured/           # Featured destinations
│   │   │   ├── ImageGallery/       # Photo gallery viewer
│   │   │   ├── Itinerary/          # Trip planning & itineraries
│   │   │   ├── Login/              # User login page
│   │   │   ├── MyList/             # Favorite spots collection
│   │   │   ├── Register/           # User registration
│   │   │   ├── ReviewSection/      # User reviews & ratings
│   │   │   ├── SimilarSpots/       # Related destinations
│   │   │   ├── SpotDetails/        # Full destination details
│   │   │   ├── UpdateProfile/      # Edit user profile
│   │   │   ├── UserProfile/        # View user profile
│   │   │   ├── WeatherInfo/        # Weather forecasts
│   │   │   └── ...
│   │   ├── firebase/                # Firebase configuration
│   │   ├── providers/               # Context providers (Auth)
│   │   ├── routes/                  # Route definitions
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── explore-se-asia-server/          # Express backend API
│   ├── index.js                     # Server entry point
│   ├── package.json
│   └── vercel.json
│
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) and npm
- **MongoDB** (local or Atlas cloud database)
- **Firebase Account** (for authentication and hosting)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kawsar12759/explore-se-asia.git
cd explore-se-asia
```

2. **Setup Frontend**
```bash
cd explore-se-asia-client
npm install
```

3. **Setup Backend**
```bash
cd ../explore-se-asia-server
npm install
```

### Configuration

#### Frontend (.env.local)
Create a `.env.local` file in `explore-se-asia-client/`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
```

#### Backend (.env)
Create a `.env` file in `explore-se-asia-server/`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
```

---

## 🏃 Running the Project

### Development Mode

**Frontend** (from `explore-se-asia-client/`):
```bash
npm run dev
```
Runs at: `http://localhost:5173`

**Backend** (from `explore-se-asia-server/`):
```bash
npm start
```
Runs at: `http://localhost:5000`

### Production Build

**Frontend** (from `explore-se-asia-client/`):
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 📡 API Endpoints

The backend provides RESTful API endpoints for managing destinations, reviews, itineraries, and user data. Key endpoints include:
- `GET /api/spots` - Get all destinations
- `POST /api/spots` - Create new destination
- `GET /api/spots/:id` - Get destination details
- `PUT /api/spots/:id` - Update destination
- `DELETE /api/spots/:id` - Delete destination
- `POST /api/reviews` - Add review
- `GET /api/itineraries` - Get user itineraries

---

## 🔐 Security Features

- **Firebase Authentication** - Secure user authentication
- **Protected Routes** - Only authenticated users can access certain pages
- **Environment Variables** - Sensitive data stored securely
- **CORS** - Cross-origin requests properly configured
- **Database Validation** - Input validation on backend

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📞 Contact & Support

For questions or support, please reach out through the GitHub repository issues section.

---

## 🙏 Acknowledgments

- Southeast Asian travel community for inspiration
- DaisyUI and Tailwind CSS communities
- Firebase platform for authentication services

Happy exploring! 🌴✈️🗺️

### Client Setup
```bash
cd explore-se-asia-client
npm install
npm run dev
```

### Server Setup
```bash
cd explore-se-asia-server
npm install
# Create a .env file with your Mongo URI, and Firebase credentials
npm start
```

## 📁 Folder Structure
```bash
explore-se-asia/
│
├── explore-se-asia-client/   # React Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── routes/
│
├── explore-se-asia-server/   # Node.js Backend
│   └── routes/
│   └── controllers/
│
└── README.md
```

## 🤝 Contributing
Contributions are welcome! If you’d like to help improve the project:

1. Fork the repository.
2. Create a new branch *(git checkout -b feature-name)*
3. Commit your changes *(git commit -m 'Add new feature')*
4. Push to the branch *(git push origin feature-name)*
5. Open a pull request

Please make sure your code follows the project's coding style and conventions.


For any questions or suggestions, feel free to reach out:
- Author: Kawsar Hossain
- Email: [kawsar12759@gmail.com](mailto:your-email@example.com)
- GitHub: [kawsar12759](https://github.com/kawsar12759)