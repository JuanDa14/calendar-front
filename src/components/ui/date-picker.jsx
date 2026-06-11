import { useMemo, useState } from 'react';
import { format, setHours, setMinutes, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const QUICK_TIMES = [
	{ label: '09:00', hour: 9, minute: 0 },
	{ label: '12:00', hour: 12, minute: 0 },
	{ label: '14:00', hour: 14, minute: 0 },
	{ label: '18:00', hour: 18, minute: 0 },
];

function applyTime(date, hour, minute) {
	return setMinutes(setHours(new Date(date), hour), minute);
}

function DateTimePicker({
	value,
	onChange,
	disabled,
	placeholder = 'Seleccionar fecha y hora',
	className,
	minDate,
	showTime = true,
}) {
	const [open, setOpen] = useState(false);
	const selectedDate = value ? new Date(value) : null;
	const hour = selectedDate?.getHours() ?? 9;
	const minute = selectedDate?.getMinutes() ?? 0;

	const minDay = minDate ? startOfDay(minDate) : undefined;

	const disabledDays = useMemo(() => {
		if (!minDay) return undefined;
		return { before: minDay };
	}, [minDay]);

	const handleDateSelect = (date) => {
		if (!date) return;
		const next = applyTime(date, hour, minute);
		if (minDay && startOfDay(next) < minDay) {
			onChange(applyTime(minDay, hour, minute));
			return;
		}
		onChange(next);
	};

	const handleTimeChange = (nextHour, nextMinute) => {
		const base = selectedDate ?? minDay ?? new Date();
		onChange(applyTime(base, nextHour, nextMinute));
	};

	const displayValue = selectedDate
		? showTime
			? format(selectedDate, "PPP '·' HH:mm", { locale: es })
			: format(selectedDate, 'PPP', { locale: es })
		: null;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type='button'
					variant='outline'
					disabled={disabled}
					className={cn(
						'h-10 w-full justify-start px-3 text-left font-normal',
						!displayValue && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon className='mr-2 size-4 shrink-0' />
					<span className='truncate'>{displayValue || placeholder}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={selectedDate}
					onSelect={handleDateSelect}
					disabled={disabled ? true : disabledDays}
					initialFocus
				/>
				{showTime && (
					<div className='space-y-3 border-t p-3'>
						<div className='flex items-center gap-2 text-xs font-medium text-muted-foreground'>
							<Clock className='size-3.5' />
							Hora del evento
						</div>

						<div className='flex items-center gap-2'>
							<select
								value={hour}
								disabled={disabled}
								onChange={(e) => handleTimeChange(Number(e.target.value), minute)}
								className='h-9 flex-1 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
								aria-label='Hora'
							>
								{HOURS.map((h) => (
									<option key={h} value={h}>
										{String(h).padStart(2, '0')}
									</option>
								))}
							</select>
							<span className='text-muted-foreground'>:</span>
							<select
								value={minute}
								disabled={disabled}
								onChange={(e) => handleTimeChange(hour, Number(e.target.value))}
								className='h-9 flex-1 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
								aria-label='Minutos'
							>
								{MINUTES.map((m) => (
									<option key={m} value={m}>
										{String(m).padStart(2, '0')}
									</option>
								))}
							</select>
						</div>

						<div className='flex flex-wrap gap-1.5'>
							{QUICK_TIMES.map((preset) => (
								<Button
									key={preset.label}
									type='button'
									variant='secondary'
									size='sm'
									disabled={disabled}
									className='h-7 px-2 text-xs'
									onClick={() => handleTimeChange(preset.hour, preset.minute)}
								>
									{preset.label}
								</Button>
							))}
						</div>

						<Button
							type='button'
							size='sm'
							className='w-full'
							disabled={disabled}
							onClick={() => setOpen(false)}
						>
							Confirmar
						</Button>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}

export function DatePicker(props) {
	return <DateTimePicker {...props} />;
}

export { DateTimePicker };
