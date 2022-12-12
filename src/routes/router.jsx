import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PublicRouter = lazy(() => import('../routes/PublicRouter'));
const PrivateRouter = lazy(() => import('../routes/PrivateRouter'));

const LoginPage = lazy(() => import('../auth/LoginPage'));
const RegisterPage = lazy(() => import('../auth/RegisterPage'));
const VerifiedPage = lazy(() => import('../auth/VerifiedPage'));
const ForgotPasswordPage = lazy(() => import('../auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../auth/ResetPasswordPage'));
const CalendarPage = lazy(() => import('../pages/CalendarPage'));

export const router = createBrowserRouter([
	{
		path: 'auth',
		element: <PublicRouter />,
		children: [
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'verified',
				element: <VerifiedPage />,
			},
			{
				path: 'forgot-password',
				element: <ForgotPasswordPage />,
			},
			{
				path: 'reset-password',
				element: <ResetPasswordPage />,
			},
			{
				path: '*',
				element: <LoginPage />,
			},
		],
	},
	{
		path: '/',
		element: <PrivateRouter />,
		children: [
			{
				index: true,
				element: <CalendarPage />,
			},
			{
				path: '*',
				element: <CalendarPage />,
			},
		],
	},
]);
