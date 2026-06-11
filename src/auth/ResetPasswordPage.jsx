import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { KeyRound, Loader2 } from 'lucide-react';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { resetPassword } from '@/redux';

const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();
	const navigate = useNavigate();
	const { checking } = useSelector((state) => state.auth);

	const form = useForm({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: { password: '', password2: '' },
	});

	const onSubmit = async (values) => {
		const token = search.split('=')[1];
		if (!token) return;

		const success = await dispatch(resetPassword(token, values));
		if (success) {
			navigate('/auth/login', { replace: true });
		}
	};

	return (
		<AuthLayout
			title='Restablecer contraseña'
			subtitle='Ingresa tu nueva contraseña y confírmala para completar el proceso'
		>
			<Form {...form}>
				<motion.form
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.15 }}
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-5'
				>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nueva contraseña</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='••••••••'
										autoComplete='new-password'
										className='w-full'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password2'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmar contraseña</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='••••••••'
										autoComplete='new-password'
										className='w-full'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full' size='lg' disabled={checking}>
						{checking ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : (
							<KeyRound className='h-4 w-4' />
						)}
						{checking ? 'Restableciendo...' : 'Restablecer contraseña'}
					</Button>
				</motion.form>
			</Form>
		</AuthLayout>
	);
};

export default ResetPasswordPage;
