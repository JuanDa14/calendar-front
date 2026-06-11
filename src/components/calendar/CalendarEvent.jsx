import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const CalendarEvent = ({ event: { title, user, notes } }) => (
	<TooltipProvider delayDuration={200}>
		<Tooltip>
			<TooltipTrigger asChild>
				<div className='rbc-event-content line-clamp-1 w-full text-left text-xs font-medium text-inherit'>
					<span className='font-semibold'>{title}</span>
					{user && <span className='opacity-80'> · {user}</span>}
				</div>
			</TooltipTrigger>
			<TooltipContent side='top' className='max-w-xs'>
				<p className='font-medium'>{title}</p>
				{user && <p className='text-xs text-muted-foreground capitalize'>{user}</p>}
				{notes && <p className='mt-1 text-xs text-muted-foreground'>{notes}</p>}
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);
