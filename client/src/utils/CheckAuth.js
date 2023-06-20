//if you are not logged in you can't access the table

import { Navigate} from "react-router-dom";

const Cookies = require('js-cookie');


export default function CheckAuth({children}) {


    
    const token = Cookies.get('token');
  return token? children: <Navigate to="/login"  replace={true}/> ;
}
