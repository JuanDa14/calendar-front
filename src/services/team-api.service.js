import { calendarApi } from '../api';
import { getCookie, showErrorMessage } from '../utilities';

export const getTeamService = async (options) => {
	try {
		const { data } = await calendarApi.get(`/team${options.endpoint}`, {
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
			...options.config,
		});

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

export const postTeamService = async (options) => {
	try {
		const { data } = await calendarApi.post(`/team${options.endpoint}`, options.body, {
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
			...options.config,
		});

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

export const deleteTeamService = async (options) => {
	try {
		const { data } = await calendarApi.delete(`/team${options.endpoint}`, {
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
			...options.config,
		});

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

export const updateTeamService = async (options) => {
	try {
		const { data } = await calendarApi.put(`/team${options.endpoint}`, options.body, {
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
			...options.config,
		});

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
