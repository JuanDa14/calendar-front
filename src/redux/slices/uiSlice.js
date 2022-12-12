import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: false,
	modalTeam: false,
	modalMembers: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal: (state) => {
			state.modal = true;
		},

		closeModal: (state) => {
			state.modal = false;
		},

		openModalTeam: (state) => {
			state.modalTeam = true;
		},

		closeModalTeam: (state) => {
			state.modalTeam = false;
		},
		openModalMembers: (state) => {
			state.modalMembers = true;
		},
		closeModalMembers: (state) => {
			state.modalMembers = false;
		},
	},
});

export const {
	openModal,
	closeModal,
	openModalTeam,
	closeModalTeam,
	openModalMembers,
	closeModalMembers,
} = uiSlice.actions;

export default uiSlice.reducer;
