import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	CalendarDays,
	LogOut,
	Menu,
	Plus,
	Search,
	Users,
	X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { openModal, openModalMembers, openModalTeam } from '@/redux/slices/uiSlice';
import { clearNote } from '@/redux/slices/noteSlice';
import { logoutUser } from '@/redux';

export const Navbar = () => {
	const { name, team } = useSelector((state) => state.auth.user);
	const { note } = useSelector((state) => state.note);
	const { members } = useSelector((state) => state.team);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const handleNewEvent = () => {
		dispatch(clearNote());
		dispatch(openModal());
	};

	const handleTeamAction = () => {
		if (members.length > 0) {
			dispatch(openModalMembers());
		} else {
			dispatch(openModalTeam());
		}
	};

	const navActions = [
		!note._id && {
			label: 'Nuevo evento',
			icon: Plus,
			onClick: handleNewEvent,
		},
		{
			label: members.length > 0 ? 'Miembros' : 'Crear equipo',
			icon: Users,
			onClick: handleTeamAction,
		},
	].filter(Boolean);

	return (
		<nav className='sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md' aria-label='Navegación principal'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between gap-4'>
					<div className='flex min-w-0 items-center gap-3'>
						<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
							<CalendarDays className='h-5 w-5' aria-hidden='true' />
						</div>
						<div className='min-w-0'>
							<span className='block truncate font-semibold'>CalendarApp</span>
							{team && (
								<Badge variant='secondary' className='mt-0.5 hidden capitalize sm:inline-flex'>
									{team}
								</Badge>
							)}
						</div>
					</div>

					<div className='hidden items-center gap-1 md:flex'>
						{navActions.map((action) => (
							<Button key={action.label} variant='ghost' size='sm' onClick={action.onClick}>
								<action.icon className='h-4 w-4' />
								{action.label}
							</Button>
						))}
						<Button variant='ghost' size='sm' className='text-muted-foreground' disabled>
							<Search className='h-4 w-4' />
							<span className='hidden lg:inline'>Buscar</span>
							<kbd className='pointer-events-none hidden rounded border bg-muted px-1.5 font-mono text-[10px] lg:inline'>
								⌘K
							</kbd>
						</Button>
					</div>

					<div className='flex items-center gap-1'>
						<ThemeToggle />

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									className='rounded-full'
									aria-label='Menú de usuario'
								>
									<div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground'>
										{name?.charAt(0)?.toUpperCase() || 'U'}
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-56'>
								<DropdownMenuLabel className='font-normal'>
									<p className='truncate font-medium'>{name}</p>
									{team && (
										<p className='truncate text-xs capitalize text-muted-foreground'>
											Equipo: {team}
										</p>
									)}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleTeamAction}>
									<Users className='h-4 w-4' />
									{members.length > 0 ? 'Ver miembros' : 'Crear equipo'}
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => dispatch(logoutUser())}
									className='text-destructive focus:text-destructive'
								>
									<LogOut className='h-4 w-4' />
									Salir
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Button
							variant='ghost'
							size='icon'
							className='md:hidden'
							onClick={() => setIsOpen(!isOpen)}
							aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
							aria-expanded={isOpen}
						>
							{isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
						</Button>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className='overflow-hidden border-t md:hidden'
					>
						<div className='flex flex-col gap-1 p-3'>
							<p className='px-2 py-1 text-xs font-medium text-muted-foreground'>{name}</p>
							{navActions.map((action) => (
								<Button
									key={action.label}
									variant='ghost'
									className='w-full justify-start gap-2'
									onClick={() => {
										action.onClick();
										setIsOpen(false);
									}}
								>
									<action.icon className='h-4 w-4' />
									{action.label}
								</Button>
							))}
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 text-destructive'
								onClick={() => {
									dispatch(logoutUser());
									setIsOpen(false);
								}}
							>
								<LogOut className='h-4 w-4' />
								Salir
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};
