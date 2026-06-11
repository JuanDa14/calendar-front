import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/redux';
import { isValidValuesOfResetPassword } from '@/validators';

const initialState = { password: '', password2: '' };

const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();
	const navigate = useNavigate();
	const [values, setValues] = useState(initialState);
	const { checking } = useSelector((state) => state.auth);

	const onSubmit = async (e) => {
		e.preventDefault();
		const isValid = isValidValuesOfResetPassword(values);
		if (isValid) {
			const token = search.split('=')[1];
			await dispatch(resetPassword(token, values));
			navigate('/auth/login', { replace: true });
		}
	};

	return (
		<AuthLayout
			title='Restablecer contraseña'
			subtitle='Ingresa tu nueva contraseña y confírmala para completar el proceso'
		>
			<motion.form
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				onSubmit={onSubmit}
				className='space-y-5'
			>
				<div className='space-y-2'>
					<Label htmlFor='password'>Nueva contraseña</Label>
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
					<Label htmlFor='password2'>Confirmar contraseña</Label>
					<Input
						id='password2'
						type='password'
						placeholder='••••••••'
						required
						minLength={6}
						value={values.password2}
						onChange={(e) => setValues({ ...values, password2: e.target.value })}
					/>
				</div>

				<Button type='submit' className='w-full' size='lg' disabled={checking}>
					<KeyRound className='h-4 w-4' />
					{checking ? 'Cargando...' : 'Restablecer contraseña'}
				</Button>
			</motion.form>
		</AuthLayout>
	);
};

export default ResetPasswordPage;
