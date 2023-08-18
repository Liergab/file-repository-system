
import jwtDecode from 'jwt-decode';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  // Fetch the token from local storage (you might want to change this based on your token storage method)
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // Decode the token to check its validity and expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp > currentTime) {
        // Token is valid and not expired
        return <Outlet />;
      }
    } catch (error) {
      // Token is invalid or expired
      console.error('Invalid token:', error);
    }
  }

  // Token is missing, expired, or invalid, so navigate to the login page
  return <Navigate to="/login" />;
};

export default PrivateRoutes;
