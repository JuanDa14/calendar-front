import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, LogIn } from 'lucide-react';

import { Spinner } from '@/components/ui/Spinner';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { verifiedEmail } from '@/redux';

const VerifiedPage = () => {
	const dispatch = useDispatch();
	const { verified } = useSelector((state) => state.auth);
	const { search } = useLocation();

	useEffect(() => {
		const token = search.split('=')[1];
		if (token) dispatch(verifiedEmail(token));
	}, [dispatch, search]);

	return (
		<AuthLayout
			title='Confirmar cuenta'
			subtitle='Estamos verificando tu cuenta. Esto puede tardar unos segundos.'
		>
			<div className='flex flex-col items-center justify-center py-8'>
				{verified ? (
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex flex-col items-center gap-6 text-center'
					>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
							<CheckCircle2 className='h-8 w-8 text-primary' />
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
				) : (
					<Spinner className='h-40' />
				)}
			</div>
		</AuthLayout>
	);
};

export default VerifiedPage;
