import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import AllSpot from './components/AllSpot/AllSpot.jsx';
import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AddSpot from './components/AddSpot/AddSpot.jsx';
import MyList from './components/MyList/MyList.jsx';
import UpdateProfile from './components/UpdateProfile/UpdateProfile.jsx';
import SpotDetails from './components/SpotDetails/SpotDetails.jsx';
import UpdateSpot from './components/UpdateSpot/UpdateSpot.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import Itinerary from './components/Itinerary/Itinerary.jsx';
import ItineraryCreate from './components/Itinerary/ItineraryCreate.jsx';
import ItineraryDetails from './components/Itinerary/ItineraryDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://explore-se-asia-server.vercel.app/spots')
      },
      {
        path: "/all-spots",
        element: <AllSpot></AllSpot>,
        loader: () => fetch('https://explore-se-asia-server.vercel.app/spots')
      },
      {
        path: '/spot-details/:id',
        element: <PrivateRoute><SpotDetails></SpotDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://explore-se-asia-server.vercel.app/spots/${params.id}`)
      },
      {
        path: '/add-spot',
        element: <PrivateRoute><AddSpot></AddSpot></PrivateRoute>
      },

      {
        path: '/my-list',
        element: <PrivateRoute><MyList></MyList></PrivateRoute>
      },
      {
        path: '/update-spot/:id',
        element: <PrivateRoute><UpdateSpot></UpdateSpot></PrivateRoute>,
        loader: ({ params }) => fetch(`https://explore-se-asia-server.vercel.app/spots/${params.id}`)
      },
      {
        path: 'update-profile',
        element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
      {
        path: '/profile/:email',
        element: <UserProfile></UserProfile>
      },
      {
        path: '/itineraries',
        element: <PrivateRoute><Itinerary></Itinerary></PrivateRoute>
      },
      {
        path: '/itinerary/create',
        element: <PrivateRoute><ItineraryCreate></ItineraryCreate></PrivateRoute>
      },
      {
        path: '/itinerary/:id',
        element: <PrivateRoute><ItineraryDetails></ItineraryDetails></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
