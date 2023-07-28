import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, closeModalMembers, closeModalTeam } from '../../redux/slices/uiSlice';
import { clearShowMembers } from '../../redux/slices/teamSlice';

import { customStyles } from '../../utilities';

export const Modal = ({ children }) => {
	const { modal, modalTeam, modalMembers } = useSelector((state) => state.ui);

	const dispatch = useDispatch();

	return (
		<>
			{modal && (
				<ReactModal
					isOpen={modal}
					onRequestClose={() => {
						dispatch(closeModal());
					}}
					style={customStyles}
					closeTimeoutMS={200}
					role={'dialog'}
					className={'modal'}
				>
					{children}
				</ReactModal>
			)}

			{modalTeam && (
				<ReactModal
					isOpen={modalTeam}
					onRequestClose={() => {
						dispatch(clearShowMembers());
						dispatch(closeModalTeam());
					}}
					style={customStyles}
					closeTimeoutMS={200}
					role={'dialog'}
					className={'modal'}
				>
					{children}
				</ReactModal>
			)}

			{modalMembers && (
				<ReactModal
					isOpen={modalMembers}
					onRequestClose={() => {
						dispatch(clearShowMembers());
						dispatch(closeModalMembers());
					}}
					style={customStyles}
					closeTimeoutMS={200}
					role={'dialog'}
					className={'modal'}
				>
					{children}
				</ReactModal>
			)}
		</>
	);
};
