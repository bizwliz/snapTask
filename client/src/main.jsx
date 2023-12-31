import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleSnap from './pages/SingleSnap';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import Project from "./pages/Project.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
     {
        index: 'true',
        element: <Login />
      },
      {
        path: '/project',
        element: <Project />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/snaps/:snapId',
        element: <SingleSnap />
      }, {
        path: '/home',
        element: <Home />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
