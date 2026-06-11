import { useDispatch, useSelector } from 'react-redux';
import {
	CalendarDays,
	LogOut,
	PanelLeftClose,
	Search,
	Settings2,
	UserPlus,
	Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import { clearNote } from '@/redux/slices/noteSlice';
import {
	openModal,
	openModalMembers,
	openModalTeam,
	setCommandOpen,
} from '@/redux/slices/uiSlice';
import { logoutUser } from '@/redux';

export const AppSidebar = ({ open, onClose }) => {
	const dispatch = useDispatch();
	const { name, team, uid } = useSelector((state) => state.auth.user);
	const { members, owner, description } = useSelector((state) => state.team);
	const hasTeam = Boolean(team);
	const isOwner = owner?._id === uid;

	const handleNewEvent = () => {
		dispatch(clearNote());
		dispatch(openModal());
		onClose?.();
	};

	const handleTeam = () => {
		if (hasTeam) {
			dispatch(openModalMembers());
		} else {
			dispatch(openModalTeam());
		}
		onClose?.();
	};

	const content = (
		<div className='flex h-full flex-col'>
			<div className='flex h-14 items-center gap-2 border-b border-sidebar-border px-4'>
				<div className='flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground'>
					<CalendarDays className='size-4' />
				</div>
				<div className='min-w-0 flex-1'>
					<p className='truncate text-sm font-semibold'>CalendarApp</p>
					{team && (
						<p className='truncate text-xs capitalize text-muted-foreground'>{team}</p>
					)}
				</div>
				<Button
					variant='ghost'
					size='icon'
					className='lg:hidden'
					onClick={onClose}
					aria-label='Cerrar menú'
				>
					<PanelLeftClose className='size-4' />
				</Button>
			</div>

			<nav className='flex-1 space-y-1 p-3' aria-label='Menú lateral'>
				<Button
					variant='secondary'
					className='w-full justify-start gap-2'
					onClick={handleNewEvent}
				>
					<CalendarDays className='size-4' />
					Calendario
				</Button>

				<Button
					variant='ghost'
					className='w-full justify-start gap-2'
					onClick={() => {
						dispatch(setCommandOpen(true));
						onClose?.();
					}}
				>
					<Search className='size-4' />
					Buscar acciones
				</Button>

				<Separator className='my-3' />

				<p className='px-2 pb-1 text-xs font-medium text-muted-foreground'>Equipo</p>

				{hasTeam ? (
					<>
						<Button
							variant='ghost'
							className='w-full justify-start gap-2'
							onClick={handleTeam}
						>
							<Users className='size-4' />
							Ver miembros
						</Button>
						{isOwner && (
							<Button
								variant='ghost'
								className='w-full justify-start gap-2'
								onClick={() => {
									dispatch(openModalMembers('settings'));
									onClose?.();
								}}
							>
								<Settings2 className='size-4' />
								Editar equipo
							</Button>
						)}
						{description && (
							<p className='px-2 pt-1 text-xs text-muted-foreground line-clamp-2'>
								{description}
							</p>
						)}
					</>
				) : (
					<Button
						variant='ghost'
						className='w-full justify-start gap-2'
						onClick={handleTeam}
					>
						<UserPlus className='size-4' />
						Crear equipo
					</Button>
				)}

				{hasTeam && (
					<p className='px-2 pt-2 text-xs text-muted-foreground'>
						{members.length} miembro{members.length !== 1 ? 's' : ''}
					</p>
				)}
			</nav>

			<div className='mt-auto border-t border-sidebar-border p-3'>
				<div className='mb-2 flex items-center gap-2 rounded-md px-2 py-1.5'>
					<div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-medium text-sidebar-primary-foreground'>
						{name?.charAt(0)?.toUpperCase() || 'U'}
					</div>
					<div className='min-w-0 flex-1'>
						<p className='truncate text-sm font-medium'>{name}</p>
						<p className='truncate text-xs text-muted-foreground'>
							{hasTeam ? 'Miembro de equipo' : 'Sin equipo'}
						</p>
					</div>
					<ThemeToggle />
				</div>
				<Button
					variant='ghost'
					className='w-full justify-start gap-2 text-destructive hover:text-destructive'
					onClick={() => dispatch(logoutUser())}
				>
					<LogOut className='size-4' />
					Salir
				</Button>
			</div>
		</div>
	);

	return (
		<>
			<aside className='hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col'>
				{content}
			</aside>

			{open && (
				<div className='fixed inset-0 z-50 lg:hidden'>
					<button
						type='button'
						className='absolute inset-0 bg-background/80 backdrop-blur-sm'
						onClick={onClose}
						aria-label='Cerrar menú'
					/>
					<aside
						className={cn(
							'absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar shadow-xl',
							'animate-in slide-in-from-left duration-200'
						)}
					>
						{content}
					</aside>
				</div>
			)}
		</>
	);
};
