import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticated } from '../hooks';

const PublicRouter = () => {
	const { isAuthenticated } = useAuthenticated();

	return isAuthenticated ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRouter;
