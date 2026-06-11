import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes';
import { store } from './redux';
import { Spinner } from './components';
import { ThemeProvider } from './components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

export const CalendarApp = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme='system'>
				<TooltipProvider>
					<Provider store={store}>
						<Suspense fallback={<Spinner />}>
							<RouterProvider router={router} />
						</Suspense>
					</Provider>
				</TooltipProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
