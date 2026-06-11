import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

import { Spinner } from '@/components/ui/Spinner';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerUser } from '@/redux';
import { isValidValuesOfRegister } from '@/validators';

const initialState = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const RegisterPage = () => {
	const [values, setValues] = useState(initialState);
	const { checking } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		const isValid = isValidValuesOfRegister(values);
		if (isValid) {
			dispatch(registerUser(values));
			setValues(initialState);
		}
	};

	if (checking) return <Spinner />;

	return (
		<AuthLayout
			title='Crea tu cuenta'
			subtitle='Únete y comienza a organizar tus eventos hoy mismo'
		>
			<motion.form
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				onSubmit={onSubmit}
				className='space-y-4'
			>
				<div className='space-y-2'>
					<Label htmlFor='name'>Nombre de usuario</Label>
					<Input
						id='name'
						placeholder='Juandeveloper'
						required
						minLength={3}
						value={values.name}
						onChange={(e) => setValues({ ...values, name: e.target.value })}
					/>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='email'>Correo electrónico</Label>
					<Input
						id='email'
						type='email'
						placeholder='juandev@gmail.com'
						required
						value={values.email}
						onChange={(e) => setValues({ ...values, email: e.target.value })}
					/>
				</div>

				<div className='grid gap-4 sm:grid-cols-2'>
					<div className='space-y-2'>
						<Label htmlFor='password'>Contraseña</Label>
						<Input
							id='password'
							type='password'
							placeholder='••••••••'
							required
							minLength={6}
							value={values.password}
							onChange={(e) => setValues({ ...values, password: e.target.value })}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='confirmPassword'>Confirmar contraseña</Label>
						<Input
							id='confirmPassword'
							type='password'
							placeholder='••••••••'
							required
							minLength={6}
							value={values.confirmPassword}
							onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
						/>
					</div>
				</div>

				<Button type='submit' className='w-full' size='lg'>
					<UserPlus className='h-4 w-4' />
					Registrar cuenta
				</Button>

				<div className='space-y-3 pt-2 text-center text-sm'>
					<p>
						<Link
							to='/auth/forgot-password'
							className='text-muted-foreground hover:text-primary transition-colors'
						>
							¿Olvidaste tu contraseña?
						</Link>
					</p>
					<p>
						<Link to='/auth/login' className='text-primary hover:underline font-medium'>
							¿Ya tienes cuenta? Inicia sesión
						</Link>
					</p>
				</div>
			</motion.form>
		</AuthLayout>
	);
};

export default RegisterPage;
