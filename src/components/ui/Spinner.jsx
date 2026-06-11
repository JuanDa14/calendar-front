import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Spinner = ({ className }) => {
	return (
		<div className={cn('flex h-screen w-full items-center justify-center', className)}>
			<div className='flex flex-col items-center gap-3'>
				<Loader2 className='h-10 w-10 animate-spin text-primary' />
				<p className='text-sm text-muted-foreground'>Cargando...</p>
			</div>
		</div>
	);
};
