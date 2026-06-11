import { calendarApi } from '../api';
import { getCookie, showErrorMessage } from '../utilities';

const authHeaders = () => ({
	Authorization: `Bearer ${getCookie('accessToken')}`,
});

const handleError = (error) => {
	const data = error.response?.data;
	const message =
		data?.message || data?.errors?.[0]?.message || 'Error al procesar la solicitud';
	showErrorMessage(message);
	return { ok: false, message };
};

export const getProfileService = async () => {
	try {
		const { data } = await calendarApi.get('/user/profile', {
			headers: authHeaders(),
		});
		return data;
	} catch (error) {
		return handleError(error);
	}
};

export const updateProfileService = async (body) => {
	try {
		const { data } = await calendarApi.patch('/user/profile', body, {
			headers: authHeaders(),
		});
		return data;
	} catch (error) {
		return handleError(error);
	}
};

export const uploadAvatarService = async (file) => {
	try {
		const formData = new FormData();
		formData.append('avatar', file);

		const { data } = await calendarApi.post('/user/profile/avatar', formData, {
			headers: {
				...authHeaders(),
				'Content-Type': 'multipart/form-data',
			},
		});
		return data;
	} catch (error) {
		return handleError(error);
	}
};

export const deleteAvatarService = async () => {
	try {
		const { data } = await calendarApi.delete('/user/profile/avatar', {
			headers: authHeaders(),
		});
		return data;
	} catch (error) {
		return handleError(error);
	}
};
