import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, LogOut, Moon, Sun, Users } from 'lucide-react';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';
import { useTheme } from '@/components/theme-provider';
import { clearNote } from '@/redux/slices/noteSlice';
import { openModal, openModalMembers, openModalTeam } from '@/redux/slices/uiSlice';
import { logoutUser } from '@/redux';

export const CommandPalette = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	const { members } = useSelector((state) => state.team);

	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, []);

	const run = (fn) => {
		setOpen(false);
		fn();
	};

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder='Buscar acciones...' />
			<CommandList>
				<CommandEmpty>No se encontraron resultados.</CommandEmpty>

				<CommandGroup heading='Acciones'>
					<CommandItem
						onSelect={() =>
							run(() => {
								dispatch(clearNote());
								dispatch(openModal());
							})
						}
					>
						<CalendarPlus className='h-4 w-4' />
						Nuevo evento
					</CommandItem>
					<CommandItem
						onSelect={() =>
							run(() =>
								members.length > 0
									? dispatch(openModalMembers())
									: dispatch(openModalTeam())
							)
						}
					>
						<Users className='h-4 w-4' />
						{members.length > 0 ? 'Ver miembros' : 'Crear equipo'}
					</CommandItem>
				</CommandGroup>

				<CommandSeparator />

				<CommandGroup heading='Navegación'>
					<CommandItem onSelect={() => run(() => navigate('/'))}>
						Calendario
					</CommandItem>
					<CommandItem onSelect={() => run(() => navigate('/auth/login'))}>
						Iniciar sesión
					</CommandItem>
				</CommandGroup>

				<CommandSeparator />

				<CommandGroup heading='Preferencias'>
					<CommandItem
						onSelect={() =>
							run(() => setTheme(theme === 'dark' ? 'light' : 'dark'))
						}
					>
						{theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
						{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
					</CommandItem>
					<CommandItem onSelect={() => run(() => dispatch(logoutUser()))}>
						<LogOut className='h-4 w-4' />
						Cerrar sesión
					</CommandItem>
				</CommandGroup>
			</CommandList>
			<div className='border-t px-3 py-2 text-xs text-muted-foreground'>
				<CommandShortcut>⌘K</CommandShortcut> para abrir
			</div>
		</CommandDialog>
	);
};
