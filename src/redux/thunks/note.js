import {
	deleteNoteService,
	getNoteService,
	postNoteService,
	updateNoteService,
} from '../../services';

import { fomartEvent, showSuccessMessage, showDeleteMessageWithConfirm } from '../../utilities';

import {
	addAllNotes,
	addNewNote,
	clearNote,
	deleteNoteById,
	loadingFinish,
	loadingStart,
	updateNoteById,
} from '../slices/noteSlice';

import { closeModal } from '../slices/uiSlice';

export const createNote = (note) => async (dispatch) => {
	dispatch(loadingStart());

	const options = {
		endpoint: '',
		body: note,
	};

	const data = await postNoteService(options);

	if (data.ok) {
		const event = fomartEvent(data.evento);
		dispatch(addNewNote(event));
		showSuccessMessage('Evento creado correctamente');
		dispatch(closeModal());
	}

	dispatch(loadingFinish());
};

export const getAllNotes = (token) => async (dispatch) => {
	dispatch(loadingStart());

	const options = {
		endpoint: '',
	};

	const data = await getNoteService(options);

	if (data.ok) {
		const events = fomartEvent(data.eventos);
		dispatch(addAllNotes(events));
	}

	dispatch(loadingFinish());
};

export const deleteNote = (id) => async (dispatch) => {
	dispatch(loadingStart());

	const options = {
		endpoint: `/${id}`,
	};

	const { isConfirmed, isDismissed } = await showDeleteMessageWithConfirm(
		'Desea eliminar el evento?'
	);

	if (isConfirmed) {
		await deleteNoteService(options);
		await dispatch(deleteNoteById(id));
		await dispatch(clearNote());
		showSuccessMessage('Evento eliminado correctamente');
	}

	if (isDismissed) {
		dispatch(clearNote());
	}

	dispatch(loadingFinish());
};

export const updateNote = (note) => async (dispatch) => {
	dispatch(loadingStart());

	const options = {
		endpoint: `/${note._id}`,
		body: note,
	};

	const data = await updateNoteService(options);
	if (data.ok) {
		const event = fomartEvent(data.evento);
		dispatch(updateNoteById(event));
		showSuccessMessage('Evento actualizado correctamente');
		dispatch(closeModal());
	}

	dispatch(loadingFinish());
};
