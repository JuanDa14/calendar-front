import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

import 'react-datepicker/dist/react-datepicker.css';

export const DateTimerPicker = ({ label, placeholderText, selected, onChange, minDate }) => {
	return (
		<div className='mb-2'>
			<label className='text-gray-500 mb-1'>{label}</label>
			<DatePicker
				className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
				timeFormat='HH:mm'
				showTimeSelect
				timeIntervals={15}
				dateFormat='dd/MM/yyyy h:mm aa'
				selected={selected}
				onChange={onChange}
				minDate={minDate}
				placeholderText={placeholderText}
				locale='es'
				required
			/>
		</div>
	);
};
