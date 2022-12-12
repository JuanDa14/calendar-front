import { dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';

const locales = {
	es,
};

export const messages = {
	allDay: 'Todo el día',
	previous: 'Anterior',
	next: 'Siguiente',
	today: 'Hoy',
	month: 'Mes',
	week: 'Semana',
	day: 'Día',
	agenda: 'Agenda',
	date: 'Fecha',
	time: 'Hora',
	event: 'Evento',
	noEventsInRange: 'No hay eventos en este rango.',
};

export const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

export const eventStyleGetter = (evento, owner) => ({
	backgroundColor: owner._id === evento.user._id ? '#367CF7' : '#465660',
	borderRadius: '0px',
	opacity: 0.8,
	display: 'block',
	color: 'white',
});

export const style = { height: 'calc(100vh - 80px)' };
