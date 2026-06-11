import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { connectSocket, disconnectSocket } from '@/api/socket';
import { setNameTeam } from '@/redux/slices/authSlice';
import {
	addJoinRequest,
	clearMyJoinRequest,
	removeJoinRequest,
	setOwnerAndMembers,
} from '@/redux/slices/teamSlice';
import { getMembersAndEvents } from '@/redux/thunks/team';
import { showInfoMessage, showSuccessMessage, showWarningMessage } from '@/utilities';

export const useTeamSocket = () => {
	const dispatch = useDispatch();
	const { checking, user } = useSelector((state) => state.auth);
	const isAuthenticated = !checking && Boolean(user?.uid);

	useEffect(() => {
		if (!isAuthenticated) {
			disconnectSocket();
			return;
		}

		const socket = connectSocket();

		if (!socket) return;

		const onJoinRequestCreated = (request) => {
			dispatch(addJoinRequest(request));
			showInfoMessage(`${request.user.name} solicita unirse al equipo`);
		};

		const onJoinRequestRemoved = ({ requestId }) => {
			dispatch(removeJoinRequest(requestId));
		};

		const onJoinRequestCancelled = ({ requestId }) => {
			dispatch(removeJoinRequest(requestId));
		};

		const onJoinRequestApproved = async ({ team, message }) => {
			dispatch(clearMyJoinRequest());
			dispatch(setNameTeam(team.name));
			dispatch(
				setOwnerAndMembers({
					...team,
					id: team.id,
					description: team.description,
				})
			);
			await dispatch(getMembersAndEvents());
			showSuccessMessage(message || 'Tu solicitud fue aprobada');
		};

		const onJoinRequestRejected = ({ message }) => {
			dispatch(clearMyJoinRequest());
			showWarningMessage(message || 'Tu solicitud fue rechazada');
		};

		socket.on('join-request:created', onJoinRequestCreated);
		socket.on('join-request:removed', onJoinRequestRemoved);
		socket.on('join-request:cancelled', onJoinRequestCancelled);
		socket.on('join-request:approved', onJoinRequestApproved);
		socket.on('join-request:rejected', onJoinRequestRejected);

		return () => {
			socket.off('join-request:created', onJoinRequestCreated);
			socket.off('join-request:removed', onJoinRequestRemoved);
			socket.off('join-request:cancelled', onJoinRequestCancelled);
			socket.off('join-request:approved', onJoinRequestApproved);
			socket.off('join-request:rejected', onJoinRequestRejected);
		};
	}, [dispatch, isAuthenticated]);
};
