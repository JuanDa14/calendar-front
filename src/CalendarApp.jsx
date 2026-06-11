import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import { router } from './routes';
import { store } from './redux';
import { Spinner } from './components';
import { ConfirmDialog } from './components/ui/confirm-dialog';
import { ThemeProvider } from './components/theme-provider';

export const CalendarApp = () => {
	return (
		<ThemeProvider defaultTheme='system' storageKey='calendar-theme'>
			<Provider store={store}>
				<Suspense fallback={<Spinner />}>
					<RouterProvider router={router} />
				</Suspense>
				<Toaster richColors position='top-right' closeButton />
				<ConfirmDialog />
			</Provider>
		</ThemeProvider>
	);
};
