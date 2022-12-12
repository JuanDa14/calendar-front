import Swal from 'sweetalert2';

export const showSuccessMessage = (text) => {
	Swal.fire({
		icon: 'success',
		title: 'Correcto',
		text,
	});
};

export const showErrorMessage = (text) => {
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text,
	});
};

export const showWarningMessage = (text) => {
	Swal.fire({
		icon: 'warning',
		title: 'Advertencia',
		text,
	});
};

export const showInfoMessage = (text) => {
	Swal.fire({
		icon: 'info',
		title: 'Información',
		text,
	});
};

export const showQuestionMessage = (text) => {
	Swal.fire({
		icon: 'question',
		title: 'Pregunta',
		text,
	});
};

export const showCustomMessageWithConfirm = (icon, title, text, confirm, cancel) => {
	return Swal.fire({
		icon,
		title,
		text,
		showCancelButton: true,
		confirmButtonText: confirm,
		cancelButtonText: cancel,
	});
};

export const showDeleteMessageWithConfirm = (text) => {
	return Swal.fire({
		icon: 'question',
		title: '¿Estás seguro?',
		text,
		showCancelButton: true,
		confirmButtonText: 'Si, eliminar',
		cancelButtonText: 'Cancelar',
	});
};

export const showAddedMemberMessageWithConfirm = (text) => {
	return Swal.fire({
		icon: 'question',
		title: '¿Estás seguro?',
		text,
		showCancelButton: true,
		confirmButtonText: 'Si, agregar',
		cancelButtonText: 'Cancelar',
	});
};

export const showCustomMessageWithConfirmAndCancelAndInput = (icon, title, text) => {
	return Swal.fire({
		icon,
		title,
		text,
		input: 'text',
		showCancelButton: true,
		confirmButtonText: 'Si, eliminar',
		cancelButtonText: 'Cancelar',
	});
};
