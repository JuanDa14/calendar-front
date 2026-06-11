import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

export const AppLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='flex min-h-screen bg-background'>
			<AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<div className='flex min-w-0 flex-1 flex-col'>
				<AppHeader onMenuClick={() => setSidebarOpen(true)} />
				<Outlet />
			</div>
		</div>
	);
};
