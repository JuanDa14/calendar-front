import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

import { Spinner } from '@/components/ui/Spinner';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/redux';

const LoginPage = () => {
	const [values, setValues] = useState({ email: '', password: '' });
	const { checking } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(values));
	};

	if (checking) return <Spinner />;

	return (
		<AuthLayout
			title='Bienvenido de nuevo'
			subtitle='Ingresa tus credenciales para acceder a tu calendario'
		>
			<motion.form
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				onSubmit={onSubmit}
				className='space-y-5'
			>
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

				<Button type='submit' className='w-full' size='lg'>
					<LogIn className='h-4 w-4' />
					Iniciar sesión
				</Button>

				<div className='space-y-3 pt-2 text-center text-sm'>
					<p>
						<Link to='/auth/register' className='text-primary hover:underline font-medium'>
							¿No tienes cuenta? Regístrate
						</Link>
					</p>
					<p>
						<Link
							to='/auth/forgot-password'
							className='text-muted-foreground hover:text-primary transition-colors'
						>
							¿Olvidaste tu contraseña?
						</Link>
					</p>
				</div>
			</motion.form>
		</AuthLayout>
	);
};

export default LoginPage;
