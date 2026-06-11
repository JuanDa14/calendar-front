import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			locale={es}
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				root: cn('w-fit', defaultClassNames.root),
				months: cn('relative flex flex-col gap-4', defaultClassNames.months),
				month: cn('relative flex w-full flex-col gap-4', defaultClassNames.month),
				nav: cn(
					'absolute inset-x-0 top-0 flex w-full items-center justify-between',
					defaultClassNames.nav
				),
				button_previous: cn(
					buttonVariants({ variant: 'outline' }),
					'size-7 shrink-0 bg-transparent p-0 opacity-70 hover:opacity-100',
					defaultClassNames.button_previous
				),
				button_next: cn(
					buttonVariants({ variant: 'outline' }),
					'size-7 shrink-0 bg-transparent p-0 opacity-70 hover:opacity-100',
					defaultClassNames.button_next
				),
				month_caption: cn(
					'flex h-7 w-full items-center justify-center',
					defaultClassNames.month_caption
				),
				caption_label: cn('text-sm font-medium', defaultClassNames.caption_label),
				month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
				weekdays: cn('flex', defaultClassNames.weekdays),
				weekday: cn(
					'text-muted-foreground w-9 text-center text-[0.8rem] font-normal',
					defaultClassNames.weekday
				),
				week: cn('mt-2 flex w-full', defaultClassNames.week),
				day: cn(
					'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:rounded-md',
					defaultClassNames.day
				),
				day_button: cn(
					buttonVariants({ variant: 'ghost' }),
					'size-9 p-0 font-normal aria-selected:opacity-100',
					defaultClassNames.day_button
				),
				range_end: cn('day-range-end', defaultClassNames.range_end),
				selected: cn(
					'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md',
					defaultClassNames.selected
				),
				today: cn('bg-accent text-accent-foreground rounded-md', defaultClassNames.today),
				outside: cn(
					'text-muted-foreground aria-selected:text-muted-foreground opacity-50',
					defaultClassNames.outside
				),
				disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
				range_middle: cn(
					'aria-selected:bg-accent aria-selected:text-accent-foreground',
					defaultClassNames.range_middle
				),
				hidden: cn('invisible', defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Chevron: ({ orientation }) =>
					orientation === 'left' ? (
						<ChevronLeft className='size-4' />
					) : (
						<ChevronRight className='size-4' />
					),
			}}
			{...props}
		/>
	);
}

export { Calendar };
