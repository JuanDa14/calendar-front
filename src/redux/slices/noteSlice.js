import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	notes: [],
	note: {},
	loading: false,
};

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		addAllNotes: (state, action) => {
			state.notes = action.payload;
		},

		addNewNote: (state, action) => {
			state.notes.push(action.payload);
		},

		findNoteById: (state, action) => {
			state.note = state.notes.find((note) => note._id === action.payload);
		},

		updateNoteById: (state, action) => {
			state.notes = state.notes.map((note) =>
				note._id === action.payload._id ? action.payload : note
			);
		},

		deleteNoteById: (state, action) => {
			state.notes = state.notes.filter((note) => note._id !== action.payload);
		},

		deleteNotesByMemberId: (state, action) => {
			state.notes = state.notes.filter((note) => note.userId !== action.payload);
		},

		clearNote: (state) => {
			state.note = {};
		},

		clearNotes: (state) => {
			state.notes = [];
		},

		loadingStart: (state) => {
			state.loading = true;
		},

		loadingFinish: (state) => {
			state.loading = false;
		},
	},
});

export const {
	addNewNote,
	findNoteById,
	addAllNotes,
	updateNoteById,
	deleteNoteById,
	clearNote,
	clearNotes,
	loadingFinish,
	loadingStart,
	deleteNotesByMemberId,
} = noteSlice.actions;

export default noteSlice.reducer;
