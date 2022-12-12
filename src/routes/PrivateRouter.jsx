import { useAuthenticated } from '../hooks';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
	const { isAuthenticated } = useAuthenticated();

	return isAuthenticated ? <Outlet /> : <Navigate to='/auth/login' />;
};

export default PrivateRouter;
