import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DateTimerPicker } from './index';
import { Modal } from '../ui';
import { createNote, updateNote } from '../../redux';

const initial_Values = {
	title: '',
	notes: '',
	start: new Date(),
	end: new Date(),
};

export const CalendarModal = () => {
	const dispatch = useDispatch();

	const { note, loading } = useSelector((state) => state.note);
	const { uid, team } = useSelector((state) => state.auth.user);
	const { owner } = useSelector((state) => state.team);

	const [values, setValues] = useState(initial_Values);

	useEffect(() => {
		if (note._id) {
			setValues(note);
		} else {
			setValues(initial_Values);
		}
	}, [note._id]);

	const onSubmit = (e) => {
		e.preventDefault();

		if (note._id) {
			dispatch(updateNote(values));
		} else {
			dispatch(createNote(values));
		}
	};

	return (
		<Modal>
			<h1 className='font-semibold text-step-1 mb-2 text-gray-500'>
				{note._id ? 'Actualizar Evento' : 'Nuevo Evento'}
			</h1>
			<hr />
			<form className='mt-2' onSubmit={onSubmit}>
				<DateTimerPicker
					label={'Fecha y hora de inicio'}
					minDate={new Date()}
					onChange={(date) => setValues({ ...values, start: date })}
					selected={values.start}
					placeholderText={'Ingrese la fecha y hora de inicio'}
				/>

				<DateTimerPicker
					label={'Fecha y hora de termino'}
					minDate={values.start}
					onChange={(date) => setValues({ ...values, end: date })}
					selected={values.end}
					placeholderText={'Ingrese la fecha y hora de termino'}
				/>

				<div className='mt-2 mb-2'>
					<label htmlFor='title' className='text-gray-500 mb-1'>
						Titulo y notas
					</label>
					<input
						id='title'
						type='text'
						className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
						placeholder='Título del evento'
						name='title'
						autoComplete='off'
						value={values.title}
						onChange={(e) => setValues({ ...values, title: e.target.value })}
						required
					/>
				</div>

				<div>
					<textarea
						autoComplete='off'
						type='text'
						className='w-full border resize-none border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
						placeholder='Notas'
						rows='4'
						name='notes'
						value={values.notes}
						onChange={(e) => setValues({ ...values, notes: e.target.value })}
					></textarea>
				</div>

				<button
					disabled={
						team
							? note._id
								? note.userId !== uid
									? owner._id === uid
										? loading
										: true
									: loading
								: loading
							: loading
					}
					type='submit'
					className='bg-blue-500 text-sm w-full text-center hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2 flex items-center justify-center gap-1 disabled:bg-blue-300'
				>
					<span>{note._id ? 'Actualizar Evento' : 'Guardar Evento'}</span>
				</button>
			</form>
		</Modal>
	);
};
