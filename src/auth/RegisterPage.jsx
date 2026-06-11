import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, UserPlus } from 'lucide-react';

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
import { registerSchema } from '@/lib/validations/auth';
import { registerUser } from '@/redux';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const { checking } = useSelector((state) => state.auth);

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
	});

	const onSubmit = (values) => {
		dispatch(registerUser(values));
		form.reset();
	};

	return (
		<AuthLayout
			title='Crea tu cuenta'
			subtitle='Únete y comienza a organizar tus eventos hoy mismo'
		>
			<Form {...form}>
				<motion.form
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.15 }}
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre de usuario</FormLabel>
								<FormControl>
									<Input placeholder='Juandeveloper' className='w-full' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input type='email' placeholder='tu@email.com' className='w-full' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input type='password' placeholder='••••••••' className='w-full' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar</FormLabel>
									<FormControl>
										<Input type='password' placeholder='••••••••' className='w-full' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit' className='w-full' size='lg' disabled={checking}>
						{checking ? (
							<Loader2 className='h-4 w-4 animate-spin' />
						) : (
							<UserPlus className='h-4 w-4' />
						)}
						{checking ? 'Registrando...' : 'Registrar cuenta'}
					</Button>

					<div className='space-y-2 pt-1 text-center text-sm'>
						<p>
							<Link
								to='/auth/forgot-password'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								¿Olvidaste tu contraseña?
							</Link>
						</p>
						<p>
							<Link to='/auth/login' className='font-medium text-primary hover:underline'>
								¿Ya tienes cuenta? Inicia sesión
							</Link>
						</p>
					</div>
				</motion.form>
			</Form>
		</AuthLayout>
	);
};

export default RegisterPage;
