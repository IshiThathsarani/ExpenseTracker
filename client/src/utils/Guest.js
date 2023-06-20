import { Navigate} from "react-router-dom";

const Cookies = require('js-cookie');

//if you are logged in you can't access the login and register pages
export default function Guest({children}) {
    const token = Cookies.get('token');
  return !token? children: <Navigate to="/"  replace={true}/> ;
}
