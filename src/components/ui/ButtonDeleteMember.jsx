import { useDispatch, useSelector } from 'react-redux';
import { deleteMember, removedMember } from '../../redux/thunks/team';

export const ButtonDeleteMember = ({ member }) => {
	const dispatch = useDispatch();

	const { uid } = useSelector((state) => state.auth.user);
	const { owner, loading } = useSelector((state) => state.team);

	return (
		<>
			{/* Eliminar de la base de datos */}
			{uid === owner._id ? (
				<button
					disabled={loading}
					type='button'
					onClick={() => dispatch(deleteMember(member))}
					className='py-1 px-2 text-sm font-medium text-white bg-red-500 rounded-lg  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-red-300'
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
							d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
			) : (
				//Estas creando un nuevo grupo  Eliminar del state
				<button
					disabled={loading}
					type='button'
					onClick={() => dispatch(removedMember(member))}
					className='py-1 px-2 text-sm font-medium text-white bg-red-500 rounded-lg  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-red-300 '
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
							d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
			)}
		</>
	);
};
