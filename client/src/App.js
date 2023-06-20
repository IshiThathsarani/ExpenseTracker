import AppBar from './components/AppBar';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/auth';

function App() {  
  const auth = useSelector(state => state.auth);
  console.log(auth)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div>
      <AppBar />
      <Outlet />   {/* components of the children */}    
    </div>
  );
}

export default App;
