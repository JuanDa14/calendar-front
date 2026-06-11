import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent } from './dialog';
import { closeModal, closeModalMembers, closeModalTeam } from '@/redux/slices/uiSlice';
import { clearShowMembers } from '@/redux/slices/teamSlice';

export const Modal = ({ children }) => {
	const { modal, modalTeam, modalMembers } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const isOpen = modal || modalTeam || modalMembers;

	const handleClose = () => {
		if (modal) dispatch(closeModal());
		if (modalTeam) {
			dispatch(clearShowMembers());
			dispatch(closeModalTeam());
		}
		if (modalMembers) {
			dispatch(clearShowMembers());
			dispatch(closeModalMembers());
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
			<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto p-0 sm:rounded-2xl'>
				{children}
			</DialogContent>
		</Dialog>
	);
};
