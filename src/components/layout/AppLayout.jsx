import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { CalendarModal, JoinTeamModal, MembersModal, TeamModal } from '@/components';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

import { useTeamSocket } from '@/hooks/useTeamSocket';

export const AppLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { modal, modalTeam, modalJoinTeam, modalMembers } = useSelector((state) => state.ui);

	useTeamSocket();

	return (
		<div className='flex min-h-screen bg-background'>
			<AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<div className='flex min-w-0 flex-1 flex-col'>
				<AppHeader onMenuClick={() => setSidebarOpen(true)} />
				<Outlet />
			</div>

			{modal && <CalendarModal />}
			{modalTeam && <TeamModal />}
			{modalJoinTeam && <JoinTeamModal />}
			{modalMembers && <MembersModal />}
		</div>
	);
};
