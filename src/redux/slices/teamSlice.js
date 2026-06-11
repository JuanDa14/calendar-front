import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: null,
	owner: {},
	members: [],
	description: '',
	loading: false,
	showMembers: [],
};

export const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},

		finishLoading: (state) => {
			state.loading = false;
		},

		addMember: (state, action) => {
			state.members.push(action.payload);
		},

		setOwnerAndMembers: (state, action) => {
			state.members = action.payload.members;
			state.owner = action.payload.owner;
			state.id = action.payload.id;
			state.description = action.payload.description || '';
		},

		setTeamDescription: (state, action) => {
			state.description = action.payload;
		},

		setMember: (state, action) => {
			state.showMembers.push(action.payload);
		},

		clearShowMembers: (state) => {
			state.showMembers = [];
		},

		clearMembers: (state) => {
			state.members = [];
		},

		removeMember: (state, action) => {
			state.members = state.members.filter((member) => member._id !== action.payload);
		},

		resetTeam: (state) => {
			state.id = null;
			state.owner = {};
			state.members = [];
			state.description = '';
			state.showMembers = [];
		},
	},
});

export const {
	startLoading,
	finishLoading,
	addMember,
	setMember,
	clearMembers,
	removeMember,
	setOwnerAndMembers,
	setTeamDescription,
	resetTeam,
	clearShowMembers,
} = teamSlice.actions;

export default teamSlice.reducer;
