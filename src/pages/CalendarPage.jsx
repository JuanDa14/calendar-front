import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Views } from 'react-big-calendar';
import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, Spinner } from '@/components';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { localizer, messages } from '@/utilities';
import { clearNote, findNoteById } from '@/redux/slices/noteSlice';
import { openModal } from '@/redux/slices/uiSlice';

const CalendarPage = () => {
	const { notes, loading } = useSelector((state) => state.note);
	const { user, checking } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const eventStyleGetter = (event) => ({
		style: {
			backgroundColor:
				user.uid === event.userId ? 'var(--event-own)' : 'var(--event-team)',
			borderRadius: 'calc(var(--radius) - 2px)',
			border: 'none',
			color: 'var(--primary-foreground)',
			padding: '2px 6px',
			fontSize: '0.8rem',
		},
	});

	const handleSelectEvent = (event) => {
		dispatch(findNoteById(event._id));
		dispatch(openModal());
	};

	const handleCreateEvent = () => {
		dispatch(clearNote());
		dispatch(openModal());
	};

	if (checking) return <Spinner />;

	return (
		<>
			<motion.main
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className='flex flex-1 flex-col p-4 md:p-6'
			>
				{!loading && notes.length === 0 && (
					<EmptyState
						icon={CalendarPlus}
						title='No hay eventos aún'
						description='Usa el botón "Nuevo evento" en la barra superior para crear tu primer evento. Haz clic en un evento existente para verlo o editarlo.'
						action={
							<Button onClick={handleCreateEvent} className='gap-2'>
								<CalendarPlus className='size-4' />
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
							popup
							onSelectEvent={handleSelectEvent}
							style={{ height: '100%', minHeight: '460px' }}
							components={{ event: CalendarEvent }}
							eventPropGetter={eventStyleGetter}
						/>
					</div>
				</div>
			</motion.main>
		</>
	);
};

export default CalendarPage;
