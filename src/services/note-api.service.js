import { calendarApi } from '../api';
import { getCookie, showErrorMessage } from '../utilities';

export const getNoteService = async (options) => {
	try {
		const { data } = await calendarApi.get(`/events${options.endpoint}`, {
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

export const postNoteService = async (options) => {
	try {
		const { data } = await calendarApi.post(`/events${options.endpoint}`, options.body, {
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

export const deleteNoteService = async (options) => {
	try {
		const { data } = await calendarApi.delete(`/events${options.endpoint}`, {
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

export const updateNoteService = async (options) => {
	try {
		const { data } = await calendarApi.put(`/events${options.endpoint}`, options.body, {
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
