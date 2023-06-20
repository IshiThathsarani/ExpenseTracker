import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { createBrowserRouter} from "react-router-dom";
import CheckAuth from './utils/CheckAuth';
import Guest from './utils/Guest';

// const Cookies = require('js-cookie');

// const token = Cookies.get('token');

export default createBrowserRouter([
    {
      // path: "/",
      element: <App />,
      children:[   
      {
        path: "/",
        element: 
        <CheckAuth>
            <Home />
        </CheckAuth>,
        // element: token? <Home />: <Navigate to="/login"  replace={true}/>,
      },
      {
        path: "/login",
        element: 
        <Guest> 
            <Login />
        </Guest>,
      },
      {
        path: "/register",
        element: 
        <Guest>
            <Register />
        </Guest>
        
      },
    ]
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
  ]);