import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent } from './dialog';
import { closeModal, closeModalMembers } from '@/redux/slices/uiSlice';
import { clearSearchResults } from '@/redux/slices/teamSlice';
import { closeCreateTeamModal } from '@/redux/thunks/team';

export const Modal = ({ children }) => {
	const { modal, modalTeam, modalMembers } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const isOpen = modal || modalTeam || modalMembers;

	const handleClose = () => {
		if (modal) dispatch(closeModal());
		if (modalTeam) {
			dispatch(clearSearchResults());
			dispatch(closeCreateTeamModal());
		}
		if (modalMembers) {
			dispatch(clearSearchResults());
			dispatch(closeModalMembers());
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
			<DialogContent className='w-[calc(100%-2rem)] max-w-lg gap-0 overflow-y-auto p-0 sm:rounded-xl'>
				{children}
			</DialogContent>
		</Dialog>
	);
};
