let confirmState = null;
const listeners = new Set();

const notify = () => {
	listeners.forEach((listener) => listener(confirmState));
};

const createConfirmPromise = (options) => {
	return new Promise((resolve) => {
		confirmState = { ...options, resolve };
		notify();
	});
};

export const subscribeConfirm = (listener) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

export const resolveConfirm = (confirmed) => {
	if (confirmState?.resolve) {
		confirmState.resolve({ isConfirmed: confirmed, isDismissed: !confirmed });
		confirmState = null;
		notify();
	}
};

export const showDeleteMessageWithConfirm = (text) =>
	createConfirmPromise({
		title: '¿Estás seguro?',
		description: text,
		confirmText: 'Sí, eliminar',
		cancelText: 'Cancelar',
		variant: 'destructive',
	});

export const showAddedMemberMessageWithConfirm = (text) =>
	createConfirmPromise({
		title: '¿Estás seguro?',
		description: text,
		confirmText: 'Sí, agregar',
		cancelText: 'Cancelar',
	});

export const showCustomMessageWithConfirm = (icon, title, text, confirm, cancel) =>
	createConfirmPromise({
		title,
		description: text,
		confirmText: confirm,
		cancelText: cancel,
		icon,
	});
