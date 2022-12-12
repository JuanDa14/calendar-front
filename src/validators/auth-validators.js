import { showErrorMessage } from '../utilities';

const rgxEmail =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const isValidValuesOfRegister = (values) => {
	if (Object.entries(values).length === 0) {
		return showErrorMessage('Todos los campos son obligatorios');
	}

	if (values.name.length < 3) {
		return showErrorMessage('El nombre debe tener al menos 3 caracteres');
	}

	if (!rgxEmail.test(values.email)) {
		return showErrorMessage('El correo electronico no es valido');
	}

	if (values.password !== values.confirmPassword) {
		return showErrorMessage('Las contraseñas no coinciden');
	}

	return true;
};

export const isValidValuesOfResetPassword = (values) => {
	if (Object.entries(values).length === 0) {
		return showErrorMessage('Todos los campos son obligatorios');
	}

	if (values.password !== values.password2) {
		return showErrorMessage('Las contraseñas no coinciden');
	}

	return true;
};
