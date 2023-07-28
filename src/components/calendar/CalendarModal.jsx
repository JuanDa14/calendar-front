import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DateTimerPicker } from './index';
import { Modal } from '../ui';
import { createNote, updateNote } from '../../redux';
import { closeModal } from '../../redux/slices/uiSlice';

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
			<div className='bg-gray-100 flex flex-col justify-center shadow'>
				<div className='md:max-w-xl md:mx-auto'>
					<div className='px-4 py-10 bg-white shadow rounded-3xl sm:p-10'>
						<div className='max-w-md mx-auto'>
							<div className='flex items-center space-x-5'>
								<div className='h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono'>
									i
								</div>
								<div className='block pl-2 font-semibold text-xl self-start text-gray-700'>
									<h2 className='leading-relaxed capitalize font-bold text-step-1'>
										{note._id ? 'Actualizar Evento' : 'Nuevo Evento'}
									</h2>
									<p className='text-sm text-gray-500 font-normal leading-relaxed'>
										{note._id
											? 'Actualiza los datos del evento'
											: 'Llena los datos del evento'}
									</p>
								</div>
							</div>
							<form className='divide-y divide-gray-200' onSubmit={onSubmit}>
								<div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
									<div className='flex flex-col'>
										<label className='leading-loose text-step--1'>
											Título del evento
										</label>
										<input
											type='text'
											className='px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
											placeholder='Aprender ...'
											required
											minLength={3}
											onChange={(e) => setValues({ ...values, title: e.target.value })}
											name='title'
											value={values.title}
										/>
									</div>
									<div className='w-full flex flex-col sm:flex-row justify-between items-center sm:space-x-4'>
										<div className='w-full flex flex-col'>
											<label className='leading-loose text-step--1'>Inicio</label>
											<div className='relative focus-within:text-gray-600 text-gray-400'>
												<input
													type='date'
													className='pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
													onChange={(e) =>
														setValues({ ...values, start: e.target.value })
													}
													name='start'
													value={new Date(values.start).toISOString().split('T')[0]}
													required
												/>
												<div className='absolute left-3 top-2'>
													<svg
														className='w-6 h-6'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
														></path>
													</svg>
												</div>
											</div>
										</div>
										<div className='w-full flex flex-col'>
											<label className='leading-loose text-step--1'>Final</label>
											<div className='relative focus-within:text-gray-600 text-gray-400'>
												<input
													type='date'
													className='pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
													onChange={(e) =>
														setValues({ ...values, end: e.target.value })
													}
													name='end'
													value={new Date(values.end).toISOString().split('T')[0]}
													required
												/>
												<div className='absolute left-3 top-2'>
													<svg
														className='w-6 h-6'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
														></path>
													</svg>
												</div>
											</div>
										</div>
									</div>
									<div className='flex flex-col'>
										<label className='leading-loose text-step--1'>
											Descripción del evento
										</label>
										<input
											type='text'
											className='px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
											placeholder='Realizar lo antes posible (Urgencia)'
											name='notes'
											value={note.notes}
											onChange={(e) => setValues({ ...values, notes: e.target.value })}
										/>
									</div>
								</div>
								<div className='pt-4 flex items-center space-x-4'>
									<button
										disabled={loading}
										onClick={() => dispatch(closeModal())}
										type='button'
										className='flex justify-center border items-center w-full text-gray-900 px-3 py-2 rounded-md focus:outline-none hover:bg-slate-100 disabled:opacity-50'
									>
										<svg
											className='w-6 h-6 mr-3'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M6 18L18 6M6 6l12 12'
											></path>
										</svg>
										Cancelar
									</button>
									<button
										type='submit'
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
										className='bg-blue-500 flex justify-center items-center w-full text-white px-3 py-2 rounded-md focus:outline-none hover:bg-blue-800 disabled:bg-blue-300'
									>
										<span>{note._id ? 'Actualizar Evento' : 'Crear Evento'}</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
