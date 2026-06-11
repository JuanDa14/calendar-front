import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux';
import { getCookie } from '../utilities';

export const useAuthenticated = () => {
	const dispatch = useDispatch();
	const { status, checking } = useSelector((state) => state.auth);
	const refreshToken = getCookie('refreshToken');

	const isAuthenticated = useMemo(() => status === 'authenticated', [status]);
	const isInitializing = useMemo(
		() => !!refreshToken && !isAuthenticated && checking,
		[refreshToken, isAuthenticated, checking]
	);

	useEffect(() => {
		if (refreshToken && !isAuthenticated) {
			dispatch(refreshUser(refreshToken));
		}
	}, [dispatch, refreshToken, isAuthenticated]);

	return { isAuthenticated, checking, isInitializing };
};
