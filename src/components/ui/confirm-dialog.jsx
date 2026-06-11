import { useEffect, useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from './alert-dialog';
import { resolveConfirm, subscribeConfirm } from '@/utilities/confirm-dialog';

export const ConfirmDialog = () => {
	const [state, setState] = useState(null);

	useEffect(() => subscribeConfirm(setState), []);

	const handleOpenChange = (open) => {
		if (!open) resolveConfirm(false);
	};

	if (!state) return null;

	return (
		<AlertDialog open onOpenChange={handleOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{state.title}</AlertDialogTitle>
					<AlertDialogDescription>{state.description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => resolveConfirm(false)}>
						{state.cancelText || 'Cancelar'}
					</AlertDialogCancel>
					<AlertDialogAction
						className={state.variant === 'destructive' ? 'bg-destructive hover:bg-destructive/90' : ''}
						onClick={() => resolveConfirm(true)}
					>
						{state.confirmText || 'Confirmar'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
