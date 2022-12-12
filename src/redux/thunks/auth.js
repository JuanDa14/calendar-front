import { postAuthService, getAuthService } from '../../services';
import { authFormatUser, removeCookie, setCookie, showSuccessMessage } from '../../utilities';
import { checkingFinish, checkingStart, login, logout, verifiedUser } from '../slices/authSlice';
import { clearNote, clearNotes } from '../slices/noteSlice';
import { clearMembers, resetTeam } from '../slices/teamSlice';
import { getAllNotes } from './note';
import { getMembersAndEvents } from './team';

export const loginUser = (values) => async (dispatch) => {
	dispatch(checkingStart());

	const options = {
		endpoint: '/login',
		body: values,
	};

	const data = await postAuthService(options);

	if (data.ok) {
		const payload = authFormatUser(data.user);

		await dispatch(login(payload));

		setCookie(['accessToken', 'refreshToken'], [data.accessToken, data.refreshToken]);

		if (data.user.team) {
			await dispatch(getMembersAndEvents());
		} else {
			dispatch(getAllNotes(data.accessToken));
		}
	}

	dispatch(checkingFinish());
};

export const refreshUser = (refreshToken) => async (dispatch) => {
	dispatch(checkingStart());

	const options = {
		endpoint: '/refresh',
		config: {
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		},
	};

	const data = await getAuthService(options);

	if (data.ok) {
		const payload = authFormatUser(data.user);

		await dispatch(login(payload));

		setCookie(['accessToken', 'refreshToken'], [data.accessToken, data.refreshToken]);

		if (data.user.team) {
			await dispatch(getMembersAndEvents());
		} else {
			dispatch(getAllNotes(data.accessToken));
		}
	} else {
		removeCookie(['accessToken', 'refreshToken']);
	}
	dispatch(checkingFinish());
};

export const logoutUser = () => (dispatch) => {
	removeCookie(['accessToken', 'refreshToken']);
	dispatch(clearMembers());
	dispatch(resetTeam());
	dispatch(clearNote());
	dispatch(clearNotes());
	dispatch(logout());
};

export const registerUser = (values) => async (dispatch) => {
	dispatch(checkingStart());

	const options = {
		endpoint: '/register',
		body: values,
	};

	const data = await postAuthService(options);

	if (data.ok) {
		showSuccessMessage(data.message);
	}

	dispatch(checkingFinish());
};

export const verifiedEmail = (token) => async (dispatch) => {
	dispatch(checkingStart());

	const options = {
		endpoint: `/verified/${token}`,
	};

	const data = await getAuthService(options);

	if (data.ok) {
		dispatch(verifiedUser());
	}

	dispatch(checkingFinish());
};

export const forgotPassword = (email) => async (dispatch) => {
	dispatch(checkingStart());

	const options = {
		endpoint: '/forgot-password',
		body: email,
	};

	const data = await postAuthService(options);

	if (data.ok) {
		showSuccessMessage(data.message);
	}

	dispatch(checkingFinish());
};

export const resetPassword = (token, body) => async (dispatch) => {
	dispatch(checkingStart());

	const options = {
		endpoint: `/reset-password/${token}`,
		body,
	};

	const data = await postAuthService(options);

	if (data.ok) {
		showSuccessMessage(data.message);
	}

	dispatch(checkingFinish());
};
