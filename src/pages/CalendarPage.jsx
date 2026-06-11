import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-big-calendar';
import { motion } from 'framer-motion';
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
import { localizer, messages, style } from '@/utilities';
import { clearNote, findNoteById } from '@/redux/slices/noteSlice';
import { openModal } from '@/redux/slices/uiSlice';

const CalendarPage = () => {
	const { modal, modalTeam, modalMembers } = useSelector((state) => state.ui);
	const { notes } = useSelector((state) => state.note);
	const { user, checking } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const eventStyleGetter = (event) => ({
		style: {
			backgroundColor:
				user.uid === event.userId ? 'hsl(221 83% 53%)' : 'hsl(215 16% 47%)',
			borderRadius: '8px',
			border: 'none',
			opacity: 0.9,
			color: 'white',
			padding: '4px 8px',
			fontSize: '0.85rem',
		},
	});

	if (checking) return <Spinner />;

	return (
		<div className='flex min-h-screen flex-col bg-background'>
			<Navbar />
			{modal && <CalendarModal />}
			{modalTeam && <TeamModal />}
			{modalMembers && <MembersModal />}

			<motion.main
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='flex-1 p-4 md:p-6'
			>
				{notes.length === 0 && (
					<div className='mb-4 rounded-lg border border-dashed bg-card p-8 text-center'>
						<p className='text-lg font-medium text-foreground'>No hay eventos aún</p>
						<p className='mt-1 text-sm text-muted-foreground'>
							Haz clic en el botón + para crear tu primer evento
						</p>
					</div>
				)}

				<div className='overflow-hidden rounded-xl border bg-card shadow-sm'>
					<Calendar
						localizer={localizer}
						messages={messages}
						culture='es'
						events={notes}
						startAccessor='start'
						endAccessor='end'
						selectable
						onSelectEvent={(e) => dispatch(findNoteById(e._id))}
						onSelectSlot={() => dispatch(clearNote())}
						onDoubleClickEvent={(e) => {
							dispatch(findNoteById(e._id));
							dispatch(openModal());
						}}
						style={style}
						components={{ event: CalendarEvent }}
						eventPropGetter={eventStyleGetter}
					/>
				</div>
			</motion.main>

			<ButtonDeleteEvent />
			<ButtonAddEvent />
		</div>
	);
};

export default CalendarPage;
