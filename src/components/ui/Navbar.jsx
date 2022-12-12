import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, openModalMembers, openModalTeam } from '../../redux/slices/uiSlice';
import { logoutUser } from '../../redux';

export const Navbar = () => {
	const { name, team } = useSelector((state) => state.auth.user);
	const { note } = useSelector((state) => state.note);

	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	return (
		<nav className='bg-slate-700 text-white py-2.5 text-step-0 mb-2'>
			<div className='container flex flex-col md:flex-row justify-between'>
				<div className='flex justify-between items-center gap-2'>
					<p className='flex items-center gap-2'>
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
								d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
							/>
						</svg>
						<span className='font-semibold'>{name}</span>
					</p>

					<button
						onClick={() => setIsOpen(!isOpen)}
						type='button'
						className='border-[1.5px] border-slate-600 inline-flex items-center p-2 ml-3 text-step-0 rounded-lg focus:outline-none text-gray-400 md:hidden'
					>
						{isOpen ? (
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
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						) : (
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
									d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
								/>
							</svg>
						)}
					</button>
				</div>

				<div className='hidden md:flex gap-3 items-center'>
					{team ? (
						<button
							onClick={() => dispatch(openModalMembers())}
							type='button'
							className='font-semibold rounded-lg text-step--1 flex items-center border-2 border-slate-500'
						>
							<span className=' text-white font-medium inline-flex items-center gap-1 px-2.5 py-0.5 rounded mr-2'>
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
								<span className='capitalize'>{team}</span>
							</span>
						</button>
					) : (
						<button
							onClick={() => dispatch(openModalTeam())}
							className='bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md text-step--1'
						>
							Crear Equipo
						</button>
					)}

					{!note._id && (
						<button
							className='bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md text-step--1'
							onClick={() => dispatch(openModal())}
						>
							Nuevo evento
						</button>
					)}

					<button
						onClick={() => dispatch(logoutUser())}
						className='bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md text-step--1'
					>
						Salir
					</button>
				</div>

				<div className={`${isOpen ? ' mt-2 w-full' : ' hidden'}`}>
					<ul className='flex flex-col gap-2 justify-center'>
						{team ? (
							<button
								onClick={() => dispatch(openModalMembers())}
								type='button'
								className='font-semibold rounded-lg text-step--1 flex items-center justify-center border-2 border-slate-500'
							>
								<span className='text-white font-medium inline-flex items-center gap-1 px-2.5 py-0.5 rounded mr-2'>
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
									<span className='capitalize'>{team}</span>
								</span>
							</button>
						) : (
							<button
								onClick={() => dispatch(openModalTeam())}
								className='bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md text-step--1'
							>
								Crear Equipo
							</button>
						)}

						{!note._id && (
							<button
								className='bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md text-step--1'
								onClick={() => dispatch(openModal())}
							>
								Nuevo evento
							</button>
						)}

						<button
							onClick={() => dispatch(logoutUser())}
							className='bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded-md text-step--1'
						>
							Salir
						</button>
					</ul>
				</div>
			</div>
		</nav>
	);
};
