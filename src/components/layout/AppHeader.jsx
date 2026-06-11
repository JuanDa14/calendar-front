import { useDispatch } from 'react-redux';
import { CalendarPlus, Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getSearchShortcut } from '@/lib/keyboard';
import { clearNote } from '@/redux/slices/noteSlice';
import { openModal, setCommandOpen } from '@/redux/slices/uiSlice';

export const AppHeader = ({ onMenuClick, title = 'Calendario', subtitle }) => {
	const dispatch = useDispatch();
	const shortcut = getSearchShortcut();

	const handleNewEvent = () => {
		dispatch(clearNote());
		dispatch(openModal());
	};

	const handleOpenSearch = () => {
		dispatch(setCommandOpen(true));
	};

	return (
		<header className='sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6'>
			<Button
				variant='ghost'
				size='icon'
				className='lg:hidden'
				onClick={onMenuClick}
				aria-label='Abrir menú'
			>
				<Menu className='size-5' />
			</Button>

			<div className='min-w-0 flex-1'>
				<h1 className='truncate text-sm font-semibold md:text-base'>{title}</h1>
				{subtitle && (
					<p className='truncate text-xs text-muted-foreground'>{subtitle}</p>
				)}
			</div>

			<div className='flex items-center gap-2'>
				<Button
					variant='outline'
					size='sm'
					className='gap-2'
					onClick={handleOpenSearch}
					aria-label='Abrir búsqueda de acciones'
				>
					<Search className='size-4' />
					<span className='hidden md:inline'>Buscar</span>
					<kbd className='pointer-events-none hidden rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground lg:inline'>
						{shortcut}
					</kbd>
				</Button>

				<Separator orientation='vertical' className='hidden h-6 sm:block' />

				<Button size='sm' className='gap-2' onClick={handleNewEvent}>
					<CalendarPlus className='size-4' />
					<span className='hidden sm:inline'>Nuevo evento</span>
				</Button>
			</div>
		</header>
	);
};
