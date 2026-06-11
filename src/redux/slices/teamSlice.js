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
	joinRequests: [],
	myJoinRequest: null,
	joinRequestsLoading: false,
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

		setJoinRequests: (state, action) => {
			state.joinRequests = action.payload;
		},

		addJoinRequest: (state, action) => {
			const exists = state.joinRequests.some((req) => req._id === action.payload._id);
			if (!exists) state.joinRequests.unshift(action.payload);
		},

		removeJoinRequest: (state, action) => {
			state.joinRequests = state.joinRequests.filter((req) => req._id !== action.payload);
		},

		setMyJoinRequest: (state, action) => {
			state.myJoinRequest = action.payload;
		},

		clearMyJoinRequest: (state) => {
			state.myJoinRequest = null;
		},

		startJoinRequestsLoading: (state) => {
			state.joinRequestsLoading = true;
		},

		finishJoinRequestsLoading: (state) => {
			state.joinRequestsLoading = false;
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
			state.joinRequests = [];
			state.myJoinRequest = null;
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
	setJoinRequests,
	addJoinRequest,
	removeJoinRequest,
	setMyJoinRequest,
	clearMyJoinRequest,
	startJoinRequestsLoading,
	finishJoinRequestsLoading,
	resetTeam,
} = teamSlice.actions;

export default teamSlice.reducer;
