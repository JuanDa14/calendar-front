import { useDispatch, useSelector } from 'react-redux';
import { addedMember, saveAddedMember } from '../../redux/thunks/team';

export const ButtonAddedMember = ({ member }) => {
	const dispatch = useDispatch();

	const { uid } = useSelector((state) => state.auth.user);
	const { owner, loading } = useSelector((state) => state.team);

	return (
		<>
			{uid === owner._id ? (
				<button
					disabled={loading}
					type='button'
					className='py-1.5 px-2 ml-2 text-sm font-medium text-white bg-green-500 rounded-lg  hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 disabled:bg-green-300'
					onClick={() => dispatch(saveAddedMember(member))}
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
							d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
			) : (
				<button
					disabled={loading}
					type='button'
					className='py-1.5 px-2 ml-2 text-sm font-medium text-white bg-green-500 rounded-lg  hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300  disabled:bg-green-300'
					onClick={() => dispatch(addedMember(member))}
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
							d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
			)}
		</>
	);
};
