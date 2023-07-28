import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import ReactModal from 'react-modal';
import {
	ButtonDeleteEvent,
	CalendarEvent,
	CalendarModal,
	MembersModal,
	Navbar,
	Spinner,
	TeamModal,
} from '../components';

import { localizer, messages, style } from '../utilities';
import { clearNote, findNoteById } from '../redux/slices/noteSlice';
import { openModal } from '../redux/slices/uiSlice';
import { ButtonAddEvent } from '../components/ui/ButtonAddEvent';

ReactModal.setAppElement('#root');

const CalendarPage = () => {
	const { modal, modalTeam, modalMembers } = useSelector((state) => state.ui);
	const { notes } = useSelector((state) => state.note);
	const { user, checking } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const eventStyleGetter = (event) => {
		const style = {
			backgroundColor:
				user.uid === event.userId ? 'rgb(59 130 246 / 1)' : 'rgb(100 116 139 / 1)',
			borderRadius: '10px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
			padding: '5px',
		};

		return {
			style,
		};
	};

	if (checking) {
		return <Spinner />;
	}

	return (
		<div className='w-full h-screen'>
			<Navbar />
			{modal && <CalendarModal />}
			{modalTeam && <TeamModal />}
			{modalMembers && <MembersModal />}
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
				components={{
					event: CalendarEvent,
				}}
				eventPropGetter={eventStyleGetter}
			/>
			<ButtonDeleteEvent />
			<ButtonAddEvent />
		</div>
	);
};

export default CalendarPage;
