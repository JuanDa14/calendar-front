import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { router } from './routes';
import { store } from './redux';
import { Spinner } from './components';

export const CalendarApp = () => {
	return (
		<Provider store={store}>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={router} />
			</Suspense>
		</Provider>
	);
};
