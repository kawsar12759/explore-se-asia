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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader:() => fetch('http://localhost:5000/spots')
      },
      {
        path: "/all-spots",
        element: <AllSpot></AllSpot>,
        loader: () => fetch('http://localhost:5000/spots')
      },
      {
        path: '/spot-details/:id',
        element: <PrivateRoute><SpotDetails></SpotDetails></PrivateRoute>,
        loader: ({ params }) =>fetch(`http://localhost:5000/spots/${params.id}`)
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
        path: 'update-profile',
        element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
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
