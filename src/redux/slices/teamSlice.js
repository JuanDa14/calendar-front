import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: null,
	owner: {},
	members: [],
	description: '',
	loading: false,
	searching: false,
	searchResults: [],
	searchingTeams: false,
	teamSearchResults: [],
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

		startSearching: (state) => {
			state.searching = true;
		},

		finishSearching: (state) => {
			state.searching = false;
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

		setSearchResults: (state, action) => {
			state.searchResults = action.payload;
		},

		clearSearchResults: (state) => {
			state.searchResults = [];
		},

		startSearchingTeams: (state) => {
			state.searchingTeams = true;
		},

		finishSearchingTeams: (state) => {
			state.searchingTeams = false;
		},

		setTeamSearchResults: (state, action) => {
			state.teamSearchResults = action.payload;
		},

		clearTeamSearchResults: (state) => {
			state.teamSearchResults = [];
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
			state.searchResults = [];
			state.teamSearchResults = [];
		},
	},
});

export const {
	startLoading,
	finishLoading,
	startSearching,
	finishSearching,
	addMember,
	clearMembers,
	removeMember,
	setOwnerAndMembers,
	setTeamDescription,
	setSearchResults,
	clearSearchResults,
	startSearchingTeams,
	finishSearchingTeams,
	setTeamSearchResults,
	clearTeamSearchResults,
	resetTeam,
} = teamSlice.actions;

export default teamSlice.reducer;
