import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, LogOut, Moon, Settings2, Sun, Users } from 'lucide-react';

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
import { getSearchShortcut } from '@/lib/keyboard';
import { clearNote } from '@/redux/slices/noteSlice';
import {
	openModal,
	openModalMembers,
	openModalTeam,
	setCommandOpen,
	toggleCommandOpen,
} from '@/redux/slices/uiSlice';
import { logoutUser } from '@/redux';

export const CommandPalette = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	const { commandOpen } = useSelector((state) => state.ui);
	const { owner } = useSelector((state) => state.team);
	const { team, uid } = useSelector((state) => state.auth.user);
	const isOwner = owner?._id === uid;
	const shortcut = getSearchShortcut();

	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				dispatch(toggleCommandOpen());
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [dispatch]);

	const run = (fn) => {
		dispatch(setCommandOpen(false));
		fn();
	};

	return (
		<CommandDialog open={commandOpen} onOpenChange={(open) => dispatch(setCommandOpen(open))}>
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
						<CalendarPlus className='size-4' />
						Nuevo evento
					</CommandItem>
					<CommandItem
						onSelect={() =>
							run(() =>
								team ? dispatch(openModalMembers()) : dispatch(openModalTeam())
							)
						}
					>
						<Users className='size-4' />
						{team ? 'Ver miembros' : 'Crear equipo'}
					</CommandItem>
					{team && isOwner && (
						<CommandItem
							onSelect={() => run(() => dispatch(openModalMembers('settings')))}
						>
							<Settings2 className='size-4' />
							Editar equipo
						</CommandItem>
					)}
				</CommandGroup>

				<CommandSeparator />

				<CommandGroup heading='Navegación'>
					<CommandItem onSelect={() => run(() => navigate('/'))}>
						Calendario
					</CommandItem>
				</CommandGroup>

				<CommandSeparator />

				<CommandGroup heading='Preferencias'>
					<CommandItem
						onSelect={() =>
							run(() => setTheme(theme === 'dark' ? 'light' : 'dark'))
						}
					>
						{theme === 'dark' ? <Sun className='size-4' /> : <Moon className='size-4' />}
						{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
					</CommandItem>
					<CommandItem onSelect={() => run(() => dispatch(logoutUser()))}>
						<LogOut className='size-4' />
						Cerrar sesión
					</CommandItem>
				</CommandGroup>
			</CommandList>
			<div className='border-t px-3 py-2 text-xs text-muted-foreground'>
				<CommandShortcut>{shortcut}</CommandShortcut> o clic en Buscar
			</div>
		</CommandDialog>
	);
};
