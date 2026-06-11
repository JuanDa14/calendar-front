import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePicker({ value, onChange, disabled, placeholder = 'Seleccionar fecha', className }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type='button'
					variant='outline'
					disabled={disabled}
					className={cn(
						'h-10 w-full justify-start px-3 text-left font-normal',
						!value && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon className='mr-2 size-4 shrink-0' />
					{value ? format(value, 'PPP', { locale: es }) : placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={value}
					onSelect={(date) => date && onChange(date)}
					disabled={disabled}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
