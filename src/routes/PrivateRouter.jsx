import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticated } from '../hooks';
import { Spinner } from '@/components/ui/Spinner';

const PrivateRouter = () => {
	const { isAuthenticated, isInitializing } = useAuthenticated();

	if (isInitializing) {
		return <Spinner />;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to='/auth/login' replace />;
};

export default PrivateRouter;
