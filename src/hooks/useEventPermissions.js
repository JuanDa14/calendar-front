import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useEventPermissions = (eventId, eventUserId) => {
	const { uid, team } = useSelector((state) => state.auth.user);
	const { owner } = useSelector((state) => state.team);

	return useMemo(() => {
		if (!eventId) return { canEdit: true, canDelete: true };

		if (!team) return { canEdit: true, canDelete: true };

		const isOwner = eventUserId === uid;
		const isTeamLeader = owner?._id === uid;

		return {
			canEdit: isOwner || isTeamLeader,
			canDelete: isOwner || isTeamLeader,
		};
	}, [eventId, eventUserId, uid, team, owner?._id]);
};
