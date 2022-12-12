import Cookies from 'js-cookie';

export const setCookie = (name, value, days = 1) => {
	if (typeof name === 'string') {
		Cookies.set(name, value, { expires: days });
	} else if (Array.isArray(name)) {
		name.forEach((__, i) => {
			Cookies.set(name[i], value[i], { expires: days });
		});
	}
};

export const getCookie = (name) => {
	if (typeof name === 'string') {
		return Cookies.get(name);
	} else if (Array.isArray(name)) {
		const cookies = {};
		name.forEach((item) => {
			cookies[item] = Cookies.get(item);
		});
		return cookies;
	}
};

export const removeCookie = (name) => {
	if (typeof name === 'string') {
		Cookies.remove(name);
	} else if (Array.isArray(name)) {
		name.forEach((item) => {
			Cookies.remove(item);
		});
	}
};
