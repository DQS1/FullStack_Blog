import { Navigate, Outlet } from 'react-router-dom';
import Loading from '~/components/loading';
import { useAuth } from '~/hooks/useAuth';

const PrivateRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
