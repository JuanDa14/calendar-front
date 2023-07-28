import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/uiSlice';

export const ButtonAddEvent = () => {
	const dispatch = useDispatch();

	const { note, loading } = useSelector((state) => state.note);

	return (
		<>
			{!note._id && (
				<button
					disabled={loading}
					onClick={() => dispatch(openModal())}
					type='button'
					className='bg-slate-600 flex items-center p-3 rounded-full text-white fixed bottom-6 right-6 hover:bg-slate-700 disabled:bg-slate-300'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
					</svg>
				</button>
			)}
		</>
	);
};
