import * as fns from 'date-fns';

export const fomartEvent = (events) => {
	if (Array.isArray(events)) {
		return events.map((event) => ({
			...event,
			end: fns.parseISO(event.end),
			start: fns.parseISO(event.start),
		}));
	}

	return {
		...events,
		end: fns.parseISO(events.end),
		start: fns.parseISO(events.start),
	};
};
