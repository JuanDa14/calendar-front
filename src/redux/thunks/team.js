import {
	deleteTeamService,
	getTeamService,
	postTeamService,
	updateTeamService,
} from '../../services';
import {
	fomartEvent,
	showAddedMemberMessageWithConfirm,
	showCustomMessageWithConfirm,
	showDeleteMessageWithConfirm,
	showErrorMessage,
	showSuccessMessage,
} from '../../utilities';

import { clearTeam, setNameTeam } from '../slices/authSlice';
import { addAllNotes, clearNote, clearNotes, deleteNotesByMemberId } from '../slices/noteSlice';
import {
	addMember,
	clearMembers,
	clearSearchResults,
	clearTeamSearchResults,
	finishLoading,
	finishSearching,
	finishSearchingTeams,
	removeMember,
	resetTeam,
	setOwnerAndMembers,
	setSearchResults,
	setTeamSearchResults,
	setTeamDescription,
	startLoading,
	startSearching,
	startSearchingTeams,
} from '../slices/teamSlice';

import { closeModalJoinTeam, closeModalMembers, closeModalTeam, openModalJoinTeam, openModalTeam } from '../slices/uiSlice';

export const openCreateTeamModal = () => (dispatch) => {
	dispatch(clearSearchResults());
	dispatch(clearMembers());
	dispatch(openModalTeam());
};

export const closeCreateTeamModal = () => async (dispatch, getState) => {
	dispatch(closeModalTeam());

	const { team } = getState().auth.user;
	if (team) {
		await dispatch(getMembersAndEvents());
	}
};

export const openJoinTeamModal = () => (dispatch) => {
	dispatch(clearTeamSearchResults());
	dispatch(openModalJoinTeam());
};

export const closeJoinTeamModal = () => (dispatch) => {
	dispatch(clearTeamSearchResults());
	dispatch(closeModalJoinTeam());
};

export const searchTeams = (query) => async (dispatch) => {
	const trimmed = query?.trim();

	if (!trimmed || trimmed.length < 2) {
		dispatch(clearTeamSearchResults());
		return;
	}

	dispatch(startSearchingTeams());

	const data = await postTeamService({
		endpoint: '/search/team',
		body: { query: trimmed },
	});

	if (data.ok) {
		dispatch(setTeamSearchResults(data.equipos || []));
	} else {
		dispatch(clearTeamSearchResults());
	}

	dispatch(finishSearchingTeams());
};

export const joinTeam = (teamId, teamName) => async (dispatch) => {
	const { isConfirmed } = await showCustomMessageWithConfirm(
		'question',
		`¿Unirte al equipo "${teamName}"?`,
		'Tus eventos personales pasarán al calendario compartido del equipo.',
		'Sí, unirme',
		'Cancelar'
	);

	if (!isConfirmed) return;

	dispatch(startLoading());

	const data = await postTeamService({
		endpoint: `/join/${teamId}`,
		body: {},
	});

	if (data.ok) {
		dispatch(setNameTeam(data.team.name));
		dispatch(
			setOwnerAndMembers({
				...data.team,
				id: data.team.id,
				description: data.team.description,
			})
		);
		await dispatch(getMembersAndEvents());
		dispatch(closeJoinTeamModal());
		showSuccessMessage(data.message || 'Te uniste al equipo correctamente');
	}

	dispatch(finishLoading());
};

export const leaveTeam = () => async (dispatch, getState) => {
	const { team } = getState().auth.user;

	const { isConfirmed } = await showCustomMessageWithConfirm(
		'question',
		`¿Abandonar el equipo "${team}"?`,
		'Tus eventos dejarán de mostrarse en el calendario del equipo.',
		'Sí, abandonar',
		'Cancelar'
	);

	if (!isConfirmed) return;

	dispatch(startLoading());

	const data = await postTeamService({
		endpoint: '/leave',
		body: {},
	});

	if (data.ok) {
		dispatch(clearTeam());
		dispatch(resetTeam());
		dispatch(clearNotes());
		dispatch(clearNote());
		dispatch(closeModalMembers());
		showSuccessMessage(data.message || 'Has abandonado el equipo');
	}

	dispatch(finishLoading());
};

export const createTeam = (values) => async (dispatch, getState) => {
	dispatch(startLoading());

	const { members, owner } = getState().team;
	const { user } = getState().auth;
	const isMemberOfAnotherTeam = Boolean(user.team) && owner?._id !== user.uid;
	const inviteMembers = members.filter((member) => member._id !== user.uid);

	const body = {
		name: values.name,
		description: values.description,
		members: inviteMembers,
	};

	const options = {
		endpoint: '',
		body,
	};

	const { isConfirmed } = await showCustomMessageWithConfirm(
		'question',
		isMemberOfAnotherTeam ? '¿Crear tu propio equipo?' : '¿Estás seguro de crear el equipo?',
		isMemberOfAnotherTeam
			? 'Saldrás del equipo actual y tus eventos pasarán a tu nuevo calendario de equipo'
			: 'Tus eventos personales pasarán al calendario del equipo',
		'Si, crear equipo',
		'Cancelar'
	);

	if (isConfirmed) {
		const data = await postTeamService(options);

		if (data.ok) {
			dispatch(setNameTeam(data.team.name));
			dispatch(
				setOwnerAndMembers({
					...data.team,
					id: data.team.id,
					description: data.team.description,
				})
			);
			await dispatch(getMembersAndEvents());
			dispatch(closeCreateTeamModal());
			dispatch(finishLoading());
			showSuccessMessage('Equipo creado correctamente');
		}
	}
	dispatch(finishLoading());
};

export const searchMembers = (query) => async (dispatch) => {
	const trimmed = query?.trim();

	if (!trimmed || trimmed.length < 2) {
		dispatch(clearSearchResults());
		return;
	}

	dispatch(startSearching());

	const options = {
		endpoint: '/search/member',
		body: { query: trimmed },
	};

	const data = await postTeamService(options);

	if (data.ok) {
		dispatch(setSearchResults(data.usuarios || []));
	} else {
		dispatch(clearSearchResults());
	}

	dispatch(finishSearching());
};

export const addedMember = (member) => (dispatch, getState) => {
	const { members } = getState().team;
	const { uid } = getState().auth.user;

	if (member._id === uid) {
		showErrorMessage('No puedes agregarte a ti mismo');
		return;
	}

	if (members.find((m) => m._id === member._id)) {
		showErrorMessage('El usuario ya se encuentra en el equipo');
	} else {
		dispatch(addMember(member));
	}

	dispatch(clearSearchResults());
};

export const addedMembers = (membersToAdd) => (dispatch, getState) => {
	const { members } = getState().team;
	const { uid } = getState().auth.user;
	const existingIds = new Set(members.map((m) => m._id));

	const toAdd = membersToAdd.filter(
		(member) => member._id !== uid && !existingIds.has(member._id)
	);

	if (toAdd.length === 0) {
		showErrorMessage('Los usuarios seleccionados ya están en el equipo');
		return;
	}

	toAdd.forEach((member) => dispatch(addMember(member)));
	showSuccessMessage(
		`${toAdd.length} miembro${toAdd.length !== 1 ? 's' : ''} agregado${toAdd.length !== 1 ? 's' : ''}`
	);
};

export const saveAddedMembers = (users) => async (dispatch, getState) => {
	const { id } = getState().team;
	const count = users.length;

	if (count === 0) return;

	const names = users.map((user) => user.name).join(', ');

	const { isConfirmed } = await showCustomMessageWithConfirm(
		'question',
		`¿Agregar ${count} miembro${count !== 1 ? 's' : ''} al equipo?`,
		names,
		'Sí, agregar',
		'Cancelar'
	);

	if (!isConfirmed) return;

	dispatch(startLoading());

	let added = 0;

	for (const user of users) {
		const data = await postTeamService({
			endpoint: `/${id}`,
			body: { email: user.email },
		});

		if (data.ok) {
			dispatch(addMember(data.member));
			added++;
		}
	}

	if (added > 0) {
		showSuccessMessage(
			`${added} miembro${added !== 1 ? 's' : ''} agregado${added !== 1 ? 's' : ''} correctamente`
		);
	}

	dispatch(finishLoading());
};

export const saveAddedMember = (values) => async (dispatch, getState) => {
	const { id } = getState().team;

	dispatch(startLoading());

	const options = {
		endpoint: `/${id}`,
		body: values,
	};

	const { isConfirmed } = await showAddedMemberMessageWithConfirm(
		' ¿Estás seguro de agregar a este usuario al equipo? '
	);

	if (isConfirmed) {
		const data = await postTeamService(options);

		if (data.ok) {
			dispatch(addedMember(data.member));
			showSuccessMessage('Miembro agregado correctamente');
		}
	}
	dispatch(finishLoading());
};

export const removedMember = (member) => async (dispatch) => {
	const { isConfirmed } = await showDeleteMessageWithConfirm(
		`¿Estás seguro de eliminar a ${member.name} del equipo?`
	);

	if (isConfirmed) {
		dispatch(removeMember(member._id));
	}
};

export const deleteMember =
	({ email, name, _id }) =>
	async (dispatch, getState) => {
		const { id } = getState().team;

		dispatch(startLoading());

		const options = {
			endpoint: `/delete/member/${id}`,
			body: { email },
		};

		const { isConfirmed } = await showDeleteMessageWithConfirm(
			`¿Estás seguro de eliminar a ${name} del equipo?`
		);

		if (isConfirmed) {
			const data = await postTeamService(options);

			if (data.ok) {
				dispatch(removeMember(_id));
				dispatch(deleteNotesByMemberId(_id));
				showSuccessMessage('Miembro eliminado correctamente');
			}
		}
		dispatch(finishLoading());
	};

export const getMembersAndEvents = () => async (dispatch) => {
	dispatch(startLoading());

	const options = {
		endpoint: '',
	};

	const data = await getTeamService(options);

	if (data.ok && data.eventos) {
		const events = fomartEvent(data.eventos.events || []);
		dispatch(addAllNotes(events));
		dispatch(
			setOwnerAndMembers({
				members: data.eventos.members,
				owner: data.eventos.owner,
				id: data.eventos._id,
				description: data.eventos.description || '',
			})
		);
	}

	dispatch(finishLoading());
};

export const updateTeam = (values) => async (dispatch, getState) => {
	const { id } = getState().team;

	dispatch(startLoading());

	const options = {
		endpoint: `/${id}`,
		body: values,
	};

	const data = await updateTeamService(options);

	if (data.ok) {
		dispatch(setNameTeam(data.team.name));
		dispatch(setTeamDescription(data.team.description || ''));
		showSuccessMessage('Equipo actualizado correctamente');
	}

	dispatch(finishLoading());
};

export const deleteTeam = () => async (dispatch, getState) => {
	const { id } = getState().team;
	const { team } = getState().auth.user;

	dispatch(startLoading());

	const options = {
		endpoint: `/${id}`,
	};

	const { isConfirmed } = await showDeleteMessageWithConfirm(
		`Se eliminará el equipo ${team} y todos los eventos asociados. ¿Estás seguro?`
	);

	if (isConfirmed) {
		const data = await deleteTeamService(options);

		if (data.ok) {
			dispatch(clearTeam());
			dispatch(resetTeam());
			dispatch(clearNotes());
			dispatch(clearNote());
			showSuccessMessage('Equipo eliminado correctamente');
		}
	}

	dispatch(finishLoading());
};
