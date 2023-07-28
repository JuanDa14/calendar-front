import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMember } from '../../redux/thunks/team';

export const InputMemberSearch = () => {
	const dispatch = useDispatch();

	const [search, setSearch] = useState('');

	const { loading } = useSelector((state) => state.team);

	return (
		<div className='flex items-center mt-4 mb-4'>
			<div className='relative w-full'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<svg
						aria-hidden='true'
						className='w-5 h-5 text-gray-500 dark:text-gray-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
							clipRule='evenodd'
						></path>
					</svg>
				</div>
				<input
					type='search'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none block w-full pl-10 p-2.5'
					placeholder='Buscar miembro'
					name='search'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<button
				disabled={loading}
				onClick={() => dispatch(searchMember(search))}
				type='button'
				className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-blue-300'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
					/>
				</svg>
			</button>
		</div>
	);
};
