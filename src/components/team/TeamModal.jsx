import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTeam } from '../../redux/thunks/team';
import { Modal } from '../ui';
import { AddedMember, InputMemberSearch, ShowMember } from './index';
import { closeModalTeam } from '../../redux/slices/uiSlice';

const initialState = {
	name: '',
	description: '',
	member: '',
};

export const TeamModal = () => {
	const dispatch = useDispatch();

	const { members, loading, showMembers } = useSelector((state) => state.team);

	const [values, setValues] = useState(initialState);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTeam(values));
	};

	return (
		<Modal>
			<div className='bg-gray-100 flex flex-col justify-center shadow'>
				<div className='relative '>
					<div className='relative px-8 py-5 md:px-20 md:py-20 bg-white shadow rounded-3xl '>
						<div className='max-w-md mx-auto'>
							<div className='flex items-center space-x-5'>
								<div className='h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
										/>
									</svg>
								</div>
								<div className='block pl-2 font-semibold text-xl self-start text-gray-700'>
									<h2 className='leading-relaxed capitalize font-bold text-step-1'>
										Nuevo Equipo
									</h2>
									<p className='text-sm text-gray-500 font-semibold leading-relaxed capitalize'>
										Complete el formulario para crear un nuevo equipo
									</p>
								</div>
							</div>

							<form onSubmit={onSubmit}>
								<div className='mt-4'>
									<label htmlFor='grupo' className='mb-1 text-step--1 capitalize'>
										Nombre del grupo
									</label>
									<input
										autoComplete='off'
										className='pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
										id='grupo'
										minLength={6}
										name='name'
										onChange={(e) => setValues({ ...values, name: e.target.value })}
										placeholder='Developers ...'
										required
										type='text'
										value={values.title}
									/>
								</div>
								<div className='mt-2'>
									<label htmlFor='description' className='mb-1 text-step--1 capitalize'>
										Descripción del grupo
									</label>
									<input
										id='description'
										type='text'
										className='pr-4 pl-2 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
										placeholder='Equipo de desarrolladores ...'
										name='description'
										autoComplete='off'
										value={values.title}
										onChange={(e) =>
											setValues({ ...values, description: e.target.value })
										}
									/>
								</div>

								<div className='mt-2'>
									<p className='-mb-4'>Buscar Miembro</p>
									<InputMemberSearch />
								</div>

								<div className='mt-4'>
									{showMembers.length > 0 && <ShowMember />}

									{members.length > 0 && (
										<>
											<p className='flex font-semibold my-1.5 border-b mb-3'>Miembros</p>
											<AddedMember />
										</>
									)}
								</div>

								<div className=' mt-4 flex items-center space-x-4'>
									<button
										onClick={() => dispatch(closeModalTeam())}
										type='button'
										className='flex justify-center border items-center w-full text-gray-900 px-4 py-2 rounded-md focus:outline-none hover:bg-slate-100 disabled:opacity-50'
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
										Cerrar
									</button>
									<button
										disabled={loading && members.length > 0}
										type='submit'
										className='flex justify-center border items-center w-full text-white px-4 py-2 rounded-md bg-slate-700 focus:outline-none hover:bg-slate-600 disabled:opacity-50'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-6 h-6'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M4.5 12.75l6 6 9-13.5'
											/>
										</svg>
										{loading ? 'Creando...' : 'Crear grupo'}
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
