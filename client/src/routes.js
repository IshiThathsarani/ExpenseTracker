import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { createBrowserRouter, Navigate} from "react-router-dom";

const Cookies = require('js-cookie');

const token = Cookies.get('token');

export default createBrowserRouter([
    {
      // path: "/",
      element: <App />,
      children:[   
      {
        path: "/",
        element: token? <Home />: <Navigate to="/login"  replace={true}/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
  ]);