import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';

export const AuthLayout = ({ children, title, subtitle }) => {
	return (
		<div className='min-h-screen bg-background'>
			<div className='absolute right-4 top-4 z-10'>
				<ThemeToggle />
			</div>

			<div className='container flex min-h-screen items-center justify-center py-12'>
				<div className='grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:gap-12'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className='hidden flex-col justify-center lg:flex'
					>
						<Link to='/' className='mb-8 flex items-center gap-3'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg'>
								<CalendarDays className='h-6 w-6' />
							</div>
							<span className='text-2xl font-bold tracking-tight'>CalendarApp</span>
						</Link>

						<h1 className='text-4xl font-bold tracking-tight text-foreground'>
							Organiza tu tiempo,
							<span className='text-primary'> impulsa tu productividad</span>
						</h1>
						<p className='mt-4 text-lg text-muted-foreground'>
							Crea eventos, gestiona equipos y mantén a todos sincronizados con una
							experiencia moderna y fluida.
						</p>

						<div className='mt-8 grid grid-cols-3 gap-4'>
							{['Eventos', 'Equipos', 'Sincronización'].map((feature, i) => (
								<motion.div
									key={feature}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 + i * 0.1 }}
									className='rounded-lg border bg-card p-4 text-center shadow-sm'
								>
									<p className='text-sm font-medium text-foreground'>{feature}</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='flex flex-col justify-center'
					>
						<div className='mb-6 flex items-center gap-3 lg:hidden'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
								<CalendarDays className='h-5 w-5' />
							</div>
							<span className='text-xl font-bold'>CalendarApp</span>
						</div>

						<div className='rounded-xl border bg-card p-8 shadow-lg'>
							<div className='mb-6 text-center'>
								<h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
								{subtitle && <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>}
							</div>
							{children}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
