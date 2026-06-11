import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: false,
	modalTeam: false,
	modalJoinTeam: false,
	modalMembers: false,
	teamModalTab: 'members',
	commandOpen: false,
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

		openModalJoinTeam: (state) => {
			state.modalJoinTeam = true;
		},

		closeModalJoinTeam: (state) => {
			state.modalJoinTeam = false;
		},

		openModalMembers: (state, action) => {
			state.modalMembers = true;
			state.teamModalTab = action.payload || 'members';
		},
		closeModalMembers: (state) => {
			state.modalMembers = false;
			state.teamModalTab = 'members';
		},

		setCommandOpen: (state, action) => {
			state.commandOpen = action.payload;
		},

		toggleCommandOpen: (state) => {
			state.commandOpen = !state.commandOpen;
		},
	},
});

export const {
	openModal,
	closeModal,
	openModalTeam,
	closeModalTeam,
	openModalJoinTeam,
	closeModalJoinTeam,
	openModalMembers,
	closeModalMembers,
	setCommandOpen,
	toggleCommandOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
