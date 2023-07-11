import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


//kullanıcı login olmuşsa 
function ProtectedRoute({element}) {
  const {loggedIn} = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/signin"/>; //kullanıcı login olmuşşsa sayfa Outlet ile korunur , eğer login değilse signin sayfasına yönlendirir.
}
export default ProtectedRoute
