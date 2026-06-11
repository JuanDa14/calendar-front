import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { clearNote } from '@/redux/slices/noteSlice';
import { openModal } from '@/redux/slices/uiSlice';

export const ButtonAddEvent = () => {
	const dispatch = useDispatch();
	const { note, loading } = useSelector((state) => state.note);

	if (note._id) return null;

	const handleClick = () => {
		dispatch(clearNote());
		dispatch(openModal());
	};

	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className='fixed bottom-6 right-6 z-30'
		>
			<Button
				size='icon'
				disabled={loading}
				onClick={handleClick}
				className='h-14 w-14 rounded-full shadow-lg'
				aria-label='Agregar evento'
			>
				<Plus className='h-6 w-6' />
			</Button>
		</motion.div>
	);
};
