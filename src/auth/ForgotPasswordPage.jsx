import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPassword } from '@/redux';

const ForgotPasswordPage = () => {
	const dispatch = useDispatch();
	const [values, setValues] = useState({ email: '' });
	const { checking } = useSelector((state) => state.auth);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(values));
	};

	return (
		<AuthLayout
			title='Recupera tu cuenta'
			subtitle='Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña'
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
						placeholder='tu@email.com'
						required
						value={values.email}
						onChange={(e) => setValues({ ...values, email: e.target.value })}
					/>
				</div>

				<Button type='submit' className='w-full' size='lg' disabled={checking}>
					<Mail className='h-4 w-4' />
					{checking ? 'Enviando...' : 'Enviar correo electrónico'}
				</Button>

				<div className='space-y-3 pt-2 text-center text-sm'>
					<p>
						<Link to='/auth/register' className='text-primary hover:underline font-medium'>
							Crear una cuenta
						</Link>
					</p>
					<p>
						<Link to='/auth/login' className='text-muted-foreground hover:text-primary transition-colors'>
							¿Ya tienes cuenta? Inicia sesión
						</Link>
					</p>
				</div>
			</motion.form>
		</AuthLayout>
	);
};

export default ForgotPasswordPage;
