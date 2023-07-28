export const CalendarEvent = ({ event: { title, user } }) => {
	return (
		<div className='flex justify-center items-center gap-2'>
			<p className='capitalize font-semibold text-step--1'>
				{title}
				{' - '}
				<span className='capitalize font-normal'>{user} </span>
			</p>
		</div>
	);
};
