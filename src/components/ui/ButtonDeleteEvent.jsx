import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { deleteNote } from '@/redux';

export const ButtonDeleteEvent = () => {
	const dispatch = useDispatch();
	const { note, loading } = useSelector((state) => state.note);
	const { uid, team } = useSelector((state) => state.auth.user);
	const { owner } = useSelector((state) => state.team);

	if (!note._id) return null;

	const isDisabled = team
		? note.userId !== uid
			? owner._id !== uid
			: loading
		: loading;

	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className='fixed bottom-6 right-24 z-30 md:right-28'
		>
			<Button
				variant='destructive'
				size='icon'
				disabled={isDisabled}
				onClick={() => dispatch(deleteNote(note._id))}
				className='h-14 w-14 rounded-full shadow-lg'
				aria-label='Eliminar evento'
			>
				<Trash2 className='h-6 w-6' />
			</Button>
		</motion.div>
	);
};
