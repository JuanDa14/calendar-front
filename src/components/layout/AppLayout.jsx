import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { CalendarModal, MembersModal, TeamModal } from '@/components';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

export const AppLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { modal, modalTeam, modalMembers } = useSelector((state) => state.ui);

	return (
		<div className='flex min-h-screen bg-background'>
			<AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<div className='flex min-w-0 flex-1 flex-col'>
				<AppHeader onMenuClick={() => setSidebarOpen(true)} />
				<Outlet />
			</div>

			{modal && <CalendarModal />}
			{modalTeam && <TeamModal />}
			{modalMembers && <MembersModal />}
		</div>
	);
};
