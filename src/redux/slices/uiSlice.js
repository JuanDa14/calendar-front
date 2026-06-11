import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: false,
	modalTeam: false,
	modalMembers: false,
	teamModalTab: 'members',
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
		openModalMembers: (state, action) => {
			state.modalMembers = true;
			state.teamModalTab = action.payload || 'members';
		},
		closeModalMembers: (state) => {
			state.modalMembers = false;
			state.teamModalTab = 'members';
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
