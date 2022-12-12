import { calendarApi } from '../api';
import { showErrorMessage } from '../utilities';

export const postAuthService = async (options) => {
	try {
		const { data } = await calendarApi.post(
			`/user${options.endpoint}`,
			options.body,
			options.config
		);

		return data;
	} catch (error) {
		const { data } = error.response;
		const message = data.message || data.errors[0].message;
		showErrorMessage(message);

		return {
			ok: false,
		};
	}
};

export const getAuthService = async (options) => {
	try {
		const { data } = await calendarApi.get(`/user${options.endpoint}`, options.config);

		return data;
	} catch (error) {
		const { data } = error.response;
		const message = data.message || data.errors[0].message;
		showErrorMessage(message);

		return {
			ok: false,
		};
	}
};
