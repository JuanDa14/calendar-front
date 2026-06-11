import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticated } from '../hooks';
import { Spinner } from '@/components/ui/Spinner';

const PublicRouter = () => {
	const { isAuthenticated, isInitializing } = useAuthenticated();

	if (isInitializing) {
		return <Spinner />;
	}

	return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
};

export default PublicRouter;
