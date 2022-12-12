import { deleteTeamService, getTeamService, postTeamService } from '../../services';
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
	clearShowMembers,
	finishLoading,
	removeMember,
	resetTeam,
	setMember,
	setOwnerAndMembers,
	startLoading,
} from '../slices/teamSlice';

import { closeModalTeam } from '../slices/uiSlice';

export const createTeam = (values) => async (dispatch, getState) => {
	dispatch(startLoading());

	const { members } = getState().team;

	const body = {
		name: values.name,
		description: values.description,
		members,
	};

	const options = {
		endpoint: '',
		body,
	};

	const { isConfirmed } = await showCustomMessageWithConfirm(
		'question',
		'¿Estás seguro de crear el equipo?',
		'Al crear el equipo tus eventos se eliminarán debido a que estarás en un equipo',
		'Si, crear equipo',
		'Cancelar'
	);

	if (isConfirmed) {
		const data = await postTeamService(options);

		if (data.ok) {
			dispatch(setNameTeam(data.team.name));
			dispatch(setOwnerAndMembers(data.team));
			dispatch(closeModalTeam());
			dispatch(finishLoading());
			showSuccessMessage('Equipo creado correctamente');
		}
	}
	dispatch(finishLoading());
};

export const searchMember = (email) => async (dispatch) => {
	dispatch(startLoading());

	const options = {
		endpoint: '/search/member',
		body: { email },
	};

	const data = await postTeamService(options);

	if (data.ok) {
		dispatch(setMember(data.usuario));
	}

	dispatch(finishLoading());
};

export const addedMember = (member) => (dispatch, getState) => {
	const { members } = getState().team;

	if (members.find((m) => m._id === member._id)) {
		showErrorMessage('El usuario ya se encuentra en el equipo');
	} else {
		dispatch(addMember(member));
	}

	dispatch(clearShowMembers());
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

	if (data.ok) {
		const events = fomartEvent(data.eventos.events);
		dispatch(addAllNotes(events));
		dispatch(
			setOwnerAndMembers({
				members: data.eventos.members,
				owner: data.eventos.owner,
				id: data.eventos._id,
			})
		);
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
