
import { Navigate } from 'react-router-dom';

const Logout = () => {
  // Clear the JWT token from local storage
  localStorage.removeItem('token'); // Replace 'accessToken' with your actual token key

  // Redirect the user to the login page
  return <Navigate to="/login" />;
};

export default Logout;