import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarDays, LogOut, Menu, Plus, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { openModal, openModalMembers, openModalTeam } from '@/redux/slices/uiSlice';
import { logoutUser } from '@/redux';

export const Navbar = () => {
	const { name, team } = useSelector((state) => state.auth.user);
	const { note } = useSelector((state) => state.note);
	const { members } = useSelector((state) => state.team);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
	const dispatch = useDispatch();

	const navActions = [
		!note._id && {
			label: 'Nuevo evento',
			icon: Plus,
			onClick: () => dispatch(openModal()),
		},
		members.length > 0
			? {
					label: 'Miembros',
					icon: Users,
					onClick: () => dispatch(openModalMembers()),
				}
			: {
					label: 'Crear equipo',
					icon: Users,
					onClick: () => dispatch(openModalTeam()),
				},
	].filter(Boolean);

	return (
		<nav className='sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
							<CalendarDays className='h-5 w-5' />
						</div>
						<span className='hidden font-semibold sm:inline-block'>CalendarApp</span>
					</div>

					<div className='hidden items-center gap-2 md:flex'>
						{navActions.map((action) => (
							<Button key={action.label} variant='ghost' size='sm' onClick={action.onClick}>
								<action.icon className='h-4 w-4' />
								{action.label}
							</Button>
						))}
					</div>

					<div className='flex items-center gap-2'>
						<ThemeToggle />

						<div className='relative'>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-full'
								onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
							>
								<div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground'>
									{name?.charAt(0)?.toUpperCase() || 'U'}
								</div>
							</Button>

							<AnimatePresence>
								{isOpenSubMenu && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className='absolute right-0 mt-2 w-48 origin-top-right rounded-lg border bg-popover p-1 shadow-lg'
									>
										<p className='border-b px-3 py-2 text-sm font-medium'>{name}</p>
										{team && (
											<p className='px-3 py-2 text-xs text-muted-foreground capitalize'>
												Equipo: {team}
											</p>
										)}
										<Button
											variant='ghost'
											className='w-full justify-start gap-2'
											onClick={() => dispatch(logoutUser())}
										>
											<LogOut className='h-4 w-4' />
											Salir
										</Button>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						<Button
							variant='ghost'
							size='icon'
							className='md:hidden'
							onClick={() => setIsOpen(!isOpen)}
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
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};
