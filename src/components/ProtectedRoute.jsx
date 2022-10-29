import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import LoadingScreen from "../pages/LoadingScreen";
import LoginScreen from '../pages/LoginScreen';

const ProtectedRoute = ({children}) => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <LoadingScreen />
  
    return (
      <>
        {!user && <LoginScreen />}
  
        {user &&
         children
        }
  
      </>
    );
}

export default ProtectedRoute