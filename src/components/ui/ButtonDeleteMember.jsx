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
					className='py-1.5 px-2 text-sm font-medium text-white bg-red-500 rounded-lg  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-red-300'
				>
					Eliminar
				</button>
			) : (
				//Estas creando un nuevo grupo  Eliminar del state
				<button
					disabled={loading}
					type='button'
					onClick={() => dispatch(removedMember(member))}
					className='py-1.5 px-2 text-sm font-medium text-white bg-red-500 rounded-lg  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-red-300 '
				>
					Eliminar
				</button>
			)}
		</>
	);
};
