import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

function App() {
  return (
    <div className="App">
      <div><Toaster></Toaster></div>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} ></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    </div>
  );
}


export function ProtectedRoutes(props) {
  // Check if 'User' cookie exists
  if (Cookies.get("User")) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default App;
