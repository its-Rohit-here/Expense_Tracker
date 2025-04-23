


import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <div><Toaster /></div>
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Protected home route */}
        <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("User")) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default App;