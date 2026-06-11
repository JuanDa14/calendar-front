import { isBefore, startOfDay } from 'date-fns';
import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(1, 'El correo es obligatorio').email('Correo electrónico no válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z
	.object({
		name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
		email: z.string().min(1, 'El correo es obligatorio').email('Correo electrónico no válido'),
		password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
		confirmPassword: z.string().min(6, 'Confirma tu contraseña'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	});

export const forgotPasswordSchema = z.object({
	email: z.string().min(1, 'El correo es obligatorio').email('Correo electrónico no válido'),
});

export const resetPasswordSchema = z
	.object({
		password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
		password2: z.string().min(6, 'Confirma tu contraseña'),
	})
	.refine((data) => data.password === data.password2, {
		message: 'Las contraseñas no coinciden',
		path: ['password2'],
	});

const todayStart = () => startOfDay(new Date());

export const eventSchema = z
	.object({
		title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
		notes: z.string().optional(),
		start: z.coerce.date({ invalid_type_error: 'Fecha de inicio inválida' }),
		end: z.coerce.date({ invalid_type_error: 'Fecha de fin inválida' }),
	})
	.refine((data) => data.end >= data.start, {
		message: 'La fecha de fin debe ser igual o posterior al inicio',
		path: ['end'],
	})
	.refine((data) => !isBefore(startOfDay(data.end), todayStart()), {
		message: 'La fecha de fin no puede ser anterior a hoy',
		path: ['end'],
	});
