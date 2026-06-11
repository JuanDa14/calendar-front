import { io } from 'socket.io-client';

import { getCookie } from '@/utilities';

let socket = null;

const getSocketUrl = () => {
	if (import.meta.env.VITE_WS_URL) {
		return import.meta.env.VITE_WS_URL;
	}

	const apiUrl = import.meta.env.VITE_API_URL || '';
	return apiUrl.replace(/\/api\/?$/, '');
};

export const connectSocket = () => {
	const token = getCookie('accessToken');

	if (!token) return null;

	if (socket?.connected) return socket;

	if (socket) {
		socket.auth = { token };
		socket.connect();
		return socket;
	}

	socket = io(getSocketUrl(), {
		auth: { token },
		autoConnect: true,
		reconnection: true,
		reconnectionAttempts: 10,
		transports: ['websocket', 'polling'],
	});

	return socket;
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};

export const getSocket = () => socket;
