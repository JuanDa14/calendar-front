import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'notAuthenticated',
	user: {},
	verified: false,
	checking: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = 'authenticated';
			state.user = action.payload.user;
			state.verified = action.payload.verified;
		},
		logout: (state) => {
			state.status = 'notAuthenticated';
			state.user = {};
		},

		clearTeam: (state) => {
			state.user.team = null;
		},

		setNameTeam: (state, action) => {
			state.user.team = action.payload;
		},
		verifiedUser: (state) => {
			state.verified = true;
		},

		checkingFinish: (state) => {
			state.checking = false;
		},

		checkingStart: (state) => {
			state.checking = true;
		},
	},
});

export const {
	login,
	logout,
	clearTeam,
	setNameTeam,
	verifiedUser,
	checkingFinish,
	checkingStart,
} = authSlice.actions;

export default authSlice.reducer;
