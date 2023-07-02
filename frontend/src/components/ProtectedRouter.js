import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({ element: Component, isLoggedIn, ...props }) => {
  return (isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />);
};

export default ProtectedRouter;
