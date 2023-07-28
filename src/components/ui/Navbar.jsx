import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, openModalMembers, openModalTeam } from '../../redux/slices/uiSlice';
import { logoutUser } from '../../redux';

export const Navbar = () => {
	const { name, team } = useSelector((state) => state.auth.user);
	const { note } = useSelector((state) => state.note);
	const { members } = useSelector((state) => state.team);

	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);

	const dispatch = useDispatch();

	return (
		<nav className='bg-gray-800'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							onClick={() => setIsOpen(!isOpen)}
							type='button'
							className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
						>
							<svg
								className='block h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
								/>
							</svg>

							<svg
								className='hidden h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex flex-shrink-0 items-center'>
							<img
								className='h-8 w-auto'
								src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
								alt='Your Company'
							/>
						</div>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								{!note._id && (
									<button
										type='button'
										onClick={() => dispatch(openModal())}
										className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
									>
										Nueva evento
									</button>
								)}
								{members.length > 0 ? (
									<button
										onClick={() => dispatch(openModalMembers())}
										type='button'
										className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
									>
										Miembros
									</button>
								) : (
									<button
										onClick={() => dispatch(openModalTeam())}
										type='button'
										className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
									>
										Crear equipo
									</button>
								)}
							</div>
						</div>
					</div>
					<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
						<div className='relative ml-3'>
							<div>
								<button
									onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
									type='button'
									className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
								>
									<img
										className='h-8 w-8 rounded-full'
										src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
										alt=''
									/>
								</button>
							</div>
							<div
								className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
									isOpenSubMenu ? '' : 'hidden'
								}`}
							>
								<p className='block px-4 py-2 text-step--1 border-b'>
									<span className='line-clamp-1'>{name}</span>
								</p>
								{team ? (
									<button
										onClick={() => dispatch(openModalMembers())}
										type='button'
										className='w-full px-4 py-2 text-step--1 flex items-center gap-3'
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
												d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
											/>
										</svg>
										<p className='capitalize'>{team}</p>
									</button>
								) : (
									<button
										onClick={() => dispatch(openModalTeam())}
										className='w-full px-4 py-2 text-step--1 flex items-center gap-3'
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
												d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
											/>
										</svg>
										<span>Crear Equipo</span>
									</button>
								)}
								<button
									type='button'
									onClick={() => dispatch(logoutUser())}
									className='w-full flex px-4 py-2 text-step--1 gap-3 border-t'
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
											d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
										/>
									</svg>
									<span>Salir</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`${isOpen ? 'hidden' : 'sm:hidden'}`}>
				<div className='p-3 w-full flex justify-center items-center flex-col'>
					{!note._id && (
						<button
							onClick={() => dispatch(openModal())}
							className='w-full text-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
						>
							Nuevo evento
						</button>
					)}
					{members.length > 0 ? (
						<button
							onClick={() => dispatch(openModalMembers())}
							type='button'
							className='w-full text-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
						>
							Miembros
						</button>
					) : (
						<button
							onClick={() => dispatch(openModalTeam())}
							type='button'
							className='w-full text-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
						>
							Crear equipo
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
