import { motion } from 'framer-motion';
import { CalendarDays, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const features = [
	{ title: 'Eventos', desc: 'Organiza tu agenda' },
	{ title: 'Equipos', desc: 'Colabora en tiempo real' },
	{ title: 'Sincronización', desc: 'Siempre actualizado' },
];

export const AuthLayout = ({ children, title, subtitle }) => {
	return (
		<div className='relative min-h-screen w-full overflow-hidden bg-background'>
			<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background' />

			<div className='absolute right-4 top-4 z-20'>
				<ThemeToggle />
			</div>

			<div className='relative z-10 flex min-h-screen w-full items-center justify-center p-4 sm:p-6 lg:p-8'>
				<div className='grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16'>
					<motion.div
						initial={{ opacity: 0, x: -24 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
						className='hidden flex-col lg:flex'
					>
						<div className='mb-8 flex items-center gap-3'>
							<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md'>
								<CalendarDays className='h-6 w-6' aria-hidden='true' />
							</div>
							<span className='text-2xl font-semibold tracking-tight'>CalendarApp</span>
						</div>

						<h1 className='text-4xl font-bold tracking-tight text-foreground xl:text-5xl'>
							Gestiona tu tiempo
							<span className='block text-primary'>con claridad</span>
						</h1>
						<p className='mt-4 max-w-md text-lg text-muted-foreground'>
							Una experiencia moderna para planificar eventos, coordinar equipos y mantener
							todo bajo control.
						</p>

						<div className='mt-10 grid gap-3'>
							{features.map((feature, i) => (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.15 + i * 0.08 }}
									className='flex items-center gap-3 rounded-lg border bg-card/50 p-4 backdrop-blur-sm'
								>
									<Sparkles className='h-4 w-4 text-primary' aria-hidden='true' />
									<div>
										<p className='text-sm font-medium'>{feature.title}</p>
										<p className='text-xs text-muted-foreground'>{feature.desc}</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='mx-auto w-full max-w-md'
					>
						<div className='mb-6 flex items-center justify-center gap-3 lg:hidden'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
								<CalendarDays className='h-5 w-5' aria-hidden='true' />
							</div>
							<span className='text-xl font-semibold'>CalendarApp</span>
						</div>

						<Card className='border-border/60 shadow-xl'>
							<CardHeader className='space-y-1 pb-4 text-center'>
								<CardTitle className='text-2xl font-bold tracking-tight'>{title}</CardTitle>
								{subtitle && <CardDescription>{subtitle}</CardDescription>}
							</CardHeader>
							<Separator />
							<CardContent className='pt-6'>{children}</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
