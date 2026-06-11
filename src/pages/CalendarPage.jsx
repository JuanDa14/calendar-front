import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Views } from 'react-big-calendar';
import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
	ButtonDeleteEvent,
	CalendarEvent,
	CalendarModal,
	MembersModal,
	Navbar,
	Spinner,
	TeamModal,
} from '@/components';
import { ButtonAddEvent } from '@/components/ui/ButtonAddEvent';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { localizer, messages } from '@/utilities';
import { clearNote, findNoteById, setDraftNote } from '@/redux/slices/noteSlice';
import { openModal } from '@/redux/slices/uiSlice';

const CalendarPage = () => {
	const { modal, modalTeam, modalMembers } = useSelector((state) => state.ui);
	const { notes, loading } = useSelector((state) => state.note);
	const { user, checking } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const eventStyleGetter = (event) => ({
		style: {
			backgroundColor:
				user.uid === event.userId
					? 'hsl(var(--event-own))'
					: 'hsl(var(--event-team))',
			borderRadius: '6px',
			border: 'none',
			color: 'hsl(var(--primary-foreground))',
			padding: '2px 6px',
			fontSize: '0.8rem',
		},
	});

	const handleSelectSlot = ({ start, end }) => {
		dispatch(
			setDraftNote({
				title: '',
				notes: '',
				start,
				end,
			})
		);
		dispatch(openModal());
	};

	if (checking) return <Spinner />;

	return (
		<div className='flex min-h-screen flex-col bg-background'>
			<Navbar />
			{modal && <CalendarModal />}
			{modalTeam && <TeamModal />}
			{modalMembers && <MembersModal />}

			<motion.main
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35 }}
				className='flex flex-1 flex-col p-4 pb-24 md:p-6 md:pb-28'
			>
				{!loading && notes.length === 0 && (
					<EmptyState
						icon={CalendarPlus}
						title='No hay eventos aún'
						description='Crea tu primer evento haciendo clic en una fecha del calendario o usando el botón de abajo.'
						action={
							<Button
								onClick={() => {
									dispatch(clearNote());
									dispatch(openModal());
								}}
								className='gap-2'
							>
								<CalendarPlus className='h-4 w-4' />
								Crear evento
							</Button>
						}
						className='mb-4'
					/>
				)}

				<div className='min-h-[500px] flex-1 overflow-hidden rounded-xl border bg-card shadow-sm'>
					<div className='h-full min-h-[500px] p-2 sm:p-4'>
						<Calendar
							localizer={localizer}
							messages={messages}
							culture='es'
							events={notes}
							views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
							defaultView={Views.MONTH}
							startAccessor='start'
							endAccessor='end'
							selectable
							popup
							onSelectEvent={(e) => dispatch(findNoteById(e._id))}
							onSelectSlot={handleSelectSlot}
							onDoubleClickEvent={(e) => {
								dispatch(findNoteById(e._id));
								dispatch(openModal());
							}}
							style={{ height: '100%', minHeight: '460px' }}
							components={{ event: CalendarEvent }}
							eventPropGetter={eventStyleGetter}
						/>
					</div>
				</div>
			</motion.main>

			<ButtonDeleteEvent />
			<ButtonAddEvent />
		</div>
	);
};

export default CalendarPage;
