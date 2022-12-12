export const CalendarEvent = ({ event: { title, user } }) => {
	return (
		<div className='flex items-center justify-center gap-1 text-step--1'>
			<p className='uppercase font-bold'> {title} </p>
			<span className='capitalize'>- {user} </span>
		</div>
	);
};
