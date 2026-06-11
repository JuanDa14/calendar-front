import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, LogIn } from 'lucide-react';

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
import { loginSchema } from '@/lib/validations/auth';
import { loginUser } from '@/redux';

const LoginPage = () => {
	const dispatch = useDispatch();
	const { checking } = useSelector((state) => state.auth);

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = (values) => {
		dispatch(loginUser(values));
	};

	return (
		<AuthLayout
			title='Bienvenido de nuevo'
			subtitle='Ingresa tus credenciales para acceder a tu calendario'
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

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contraseña</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='••••••••'
										autoComplete='current-password'
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
							<LogIn className='h-4 w-4' />
						)}
						{checking ? 'Iniciando sesión...' : 'Iniciar sesión'}
					</Button>

					<div className='space-y-2 pt-1 text-center text-sm'>
						<p>
							<Link to='/auth/register' className='font-medium text-primary hover:underline'>
								¿No tienes cuenta? Regístrate
							</Link>
						</p>
						<p>
							<Link
								to='/auth/forgot-password'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								¿Olvidaste tu contraseña?
							</Link>
						</p>
					</div>
				</motion.form>
			</Form>
		</AuthLayout>
	);
};

export default LoginPage;
