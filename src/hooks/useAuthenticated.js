import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser, logoutUser } from '../redux';
import { getCookie } from '../utilities';

export const useAuthenticated = () => {
	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.auth);

	const isAuthenticated = useMemo(() => status === 'authenticated', [status]);

	const refreshToken = getCookie('refreshToken');

	useEffect(() => {
		if (refreshToken && !isAuthenticated) {
			dispatch(refreshUser(refreshToken));
		}
	}, []);

	return { isAuthenticated };
};
