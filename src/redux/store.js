import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { teamSlice, authSlice, noteSlice, uiSlice } from './slices';

export const store = configureStore({
	reducer: {
		note: noteSlice,
		auth: authSlice,
		ui: uiSlice,
		team: teamSlice,
	},
	middleware: [thunk],
});
