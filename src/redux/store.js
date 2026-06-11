import { configureStore } from '@reduxjs/toolkit';

import { teamSlice, authSlice, noteSlice, uiSlice } from './slices';

export const store = configureStore({
	reducer: {
		note: noteSlice,
		auth: authSlice,
		ui: uiSlice,
		team: teamSlice,
	},
});
