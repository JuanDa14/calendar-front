import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const EmptyState = ({ icon: Icon, title, description, action, className }) => (
	<motion.div
		initial={{ opacity: 0, y: 8 }}
		animate={{ opacity: 1, y: 0 }}
		className={cn(
			'flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-12 text-center',
			className
		)}
	>
		{Icon && (
			<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
				<Icon className='h-6 w-6' aria-hidden='true' />
			</div>
		)}
		<h3 className='text-lg font-semibold text-foreground'>{title}</h3>
		{description && <p className='mt-2 max-w-sm text-sm text-muted-foreground'>{description}</p>}
		{action && <div className='mt-6'>{action}</div>}
	</motion.div>
);
