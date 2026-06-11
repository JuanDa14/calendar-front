import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { CommandPalette } from './CommandPalette';

export const AppShell = () => (
	<>
		<Outlet />
		<Toaster richColors position='top-right' closeButton />
		<ConfirmDialog />
		<CommandPalette />
	</>
);
