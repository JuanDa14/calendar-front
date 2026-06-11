import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, Mail } from 'lucide-react';

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
import { forgotPasswordSchema } from '@/lib/validations/auth';
import { forgotPassword } from '@/redux';

const ForgotPasswordPage = () => {
	const dispatch = useDispatch();
	const { checking } = useSelector((state) => state.auth);

	const form = useForm({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: { email: '' },
	});

	const onSubmit = (values) => {
		dispatch(forgotPassword(values));
	};

	return (
		<AuthLayout
			title='Recupera tu cuenta'
			subtitle='Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña'
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
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='tu@email.com'
										autoComplete='email'
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
							<Mail className='h-4 w-4' />
						)}
						{checking ? 'Enviando...' : 'Enviar correo electrónico'}
					</Button>

					<div className='space-y-2 pt-1 text-center text-sm'>
						<p>
							<Link to='/auth/register' className='font-medium text-primary hover:underline'>
								Crear una cuenta
							</Link>
						</p>
						<p>
							<Link
								to='/auth/login'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								¿Ya tienes cuenta? Inicia sesión
							</Link>
						</p>
					</div>
				</motion.form>
			</Form>
		</AuthLayout>
	);
};

export default ForgotPasswordPage;
