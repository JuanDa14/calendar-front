import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, LogIn } from 'lucide-react';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { verifiedEmail } from '@/redux';

const VerifiedPage = () => {
	const dispatch = useDispatch();
	const { verified, checking } = useSelector((state) => state.auth);
	const { search } = useLocation();

	useEffect(() => {
		const token = search.split('=')[1];
		if (token) dispatch(verifiedEmail(token));
	}, [dispatch, search]);

	const isLoading = checking && !verified;
	const hasFailed = !checking && !verified;

	return (
		<AuthLayout
			title='Confirmar cuenta'
			subtitle='Estamos verificando tu cuenta. Esto puede tardar unos segundos.'
		>
			<div className='flex flex-col items-center justify-center py-8'>
				{isLoading && (
					<div className='flex w-full flex-col items-center gap-4' aria-busy='true' aria-label='Verificando cuenta'>
						<Skeleton className='h-16 w-16 rounded-full' />
						<Skeleton className='h-4 w-48' />
						<Skeleton className='h-10 w-full' />
					</div>
				)}

				{verified && (
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex w-full flex-col items-center gap-6 text-center'
					>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
							<CheckCircle2 className='h-8 w-8 text-primary' aria-hidden='true' />
						</div>
						<p className='text-muted-foreground'>
							¡Tu cuenta ha sido verificada exitosamente!
						</p>
						<Button asChild size='lg' className='w-full'>
							<Link to='/auth/login'>
								<LogIn className='h-4 w-4' />
								Iniciar sesión
							</Link>
						</Button>
					</motion.div>
				)}

				{hasFailed && (
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex w-full flex-col items-center gap-6 text-center'
						role='alert'
					>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10'>
							<AlertCircle className='h-8 w-8 text-destructive' aria-hidden='true' />
						</div>
						<div className='space-y-1'>
							<p className='font-medium'>No se pudo verificar tu cuenta</p>
							<p className='text-sm text-muted-foreground'>
								El enlace puede haber expirado o ya fue utilizado.
							</p>
						</div>
						<Button asChild variant='outline' size='lg' className='w-full'>
							<Link to='/auth/login'>Volver al inicio de sesión</Link>
						</Button>
					</motion.div>
				)}
			</div>
		</AuthLayout>
	);
};

export default VerifiedPage;
