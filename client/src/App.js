import AppBar from './components/AppBar';
import { Outlet } from 'react-router-dom';

function App() {  
  return (
    <div>
      <AppBar />
      <Outlet />   {/* components of the children */}    
    </div>
  );
}

export default App;
