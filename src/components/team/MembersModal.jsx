import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearShowMembers } from '../../redux/slices/teamSlice';
import { closeModalMembers } from '../../redux/slices/uiSlice';
import { deleteMember, deleteTeam } from '../../redux/thunks/team';
import { Modal } from '../ui';
import { InputMemberSearch } from './InputMemberSearch';
import { ShowMember } from './ShowMember';

export const MembersModal = () => {
	const dispatch = useDispatch();

	const [addedMember, setAddedMember] = useState(false);

	const { members, owner, loading } = useSelector((state) => state.team);
	const { team, uid } = useSelector((state) => state.auth.user);

	return (
		<Modal>
			<div className='bg-gray-100 flex flex-col justify-center shadow'>
				<div className='relative '>
					<div className='relative px-10 py-10 md:px-20 md:py-20 bg-white shadow rounded-3xl '>
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
										{team}
									</h2>
									<p className='text-sm text-gray-500 font-semibold leading-relaxed capitalize'>
										Owner :{' '}
										<span className='text-gray-400 font-normal'>{owner.name}</span>
									</p>
								</div>
							</div>
							<div className='mt-4 flex flex-col gap-2 md:flex-row justify-between'>
								{uid === owner._id && (
									<>
										<button
											disabled={loading}
											type='button'
											onClick={async () => {
												await dispatch(deleteTeam());
												dispatch(closeModalMembers());
											}}
											className='py-1.5 px-2 text-sm font-medium text-white bg-red-600 rounded-lg  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-red-300'
										>
											Eliminar Equipo
										</button>
										{!addedMember ? (
											<button
												disabled={loading}
												onClick={() => setAddedMember(true)}
												type='button'
												className='py-1.5 px-2 text-sm font-medium text-white bg-blue-500 rounded-lg  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-blue-300'
											>
												Agregar Miembro
											</button>
										) : (
											<button
												disabled={loading}
												onClick={() => {
													dispatch(clearShowMembers());
													setAddedMember(false);
												}}
												type='button'
												className='py-1.5 px-2 text-sm font-medium text-white bg-gray-500 rounded-lg  hover:bg-gray-600 focus:ring-4 focus:outline-none focus:gray-red-300 disabled:bg-gray-300'
											>
												Cancelar
											</button>
										)}
									</>
								)}
							</div>

							{/* Buscar nuevo miembro */}
							{addedMember && <InputMemberSearch />}

							{/* Mostrar miembros agregados */}
							<ShowMember />

							<div className='mt-4'>
								<p className='flex font-semibold my-1.5 border-b mb-3'>Miembros</p>
								<ol className='text-step-0'>
									{members.map((member, index) => (
										<li
											key={member._id}
											className='flex gap-2 justify-between items-center mb-2'
										>
											<p className='font-semibold text-step--1'>
												{index + 1}.{' '}
												<span className='font-normal capitalize'>{member.name}</span>
											</p>
											{uid === owner._id && (
												<button
													title='Eliminar miembro'
													disabled={loading}
													type='button'
													onClick={() => dispatch(deleteMember(member))}
													className='py-1 px-2 text-sm font-medium text-white bg-slate-500 rounded-lg  hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 disabled:bg-slate-300'
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
															d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
														/>
													</svg>
												</button>
											)}
										</li>
									))}
								</ol>
							</div>

							<div className=' mt-4 flex items-center space-x-4'>
								<button
									onClick={() => dispatch(closeModalMembers())}
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
