import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Loader2, Search, UserRoundPlus, Users, XCircle } from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { ModalSection, ModalShell } from '@/components/ui/modal-shell';
import { cn } from '@/lib/utils';
import {
	cancelJoinRequest,
	closeJoinTeamModal,
	requestJoinTeam,
	searchTeams,
} from '@/redux/thunks/team';
import { clearTeamSearchResults } from '@/redux/slices/teamSlice';

export const JoinTeamModal = () => {
	const dispatch = useDispatch();
	const [query, setQuery] = useState('');
	const { teamSearchResults, searchingTeams, loading, myJoinRequest } = useSelector(
		(state) => state.team
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(searchTeams(query));
		}, 300);

		return () => clearTimeout(timer);
	}, [query, dispatch]);

	useEffect(
		() => () => {
			dispatch(clearTeamSearchResults());
		},
		[dispatch]
	);

	return (
		<Modal>
			<ModalShell
				icon={Users}
				title='Unirse a un equipo'
				description='Busca un equipo y envía una solicitud. El propietario debe aprobarla.'
				footer={
					<Button type='button' variant='outline' onClick={() => dispatch(closeJoinTeamModal())}>
						Cancelar
					</Button>
				}
			>
				{myJoinRequest && (
					<div className='mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3'>
						<div className='flex items-start justify-between gap-3'>
							<div className='flex gap-2'>
								<Clock className='mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400' />
								<div>
									<p className='text-sm font-medium'>Solicitud pendiente</p>
									<p className='text-xs text-muted-foreground'>
										Equipo: <span className='capitalize'>{myJoinRequest.team.name}</span>
									</p>
									<p className='mt-1 text-xs text-muted-foreground'>
										El propietario revisará tu solicitud en tiempo real.
									</p>
								</div>
							</div>
							<Button
								type='button'
								variant='ghost'
								size='sm'
								disabled={loading}
								className='shrink-0 text-destructive hover:text-destructive'
								onClick={() => dispatch(cancelJoinRequest(myJoinRequest._id))}
							>
								<XCircle className='size-3.5' />
								Cancelar
							</Button>
						</div>
					</div>
				)}

				<ModalSection title='Buscar equipos'>
					<div
						className={cn(
							'flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3',
							'transition-colors focus-within:ring-1 focus-within:ring-ring/30'
						)}
					>
						<Search className='size-4 shrink-0 text-muted-foreground' />
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Nombre del equipo...'
							autoComplete='off'
							disabled={Boolean(myJoinRequest)}
							className='flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60'
						/>
						{searchingTeams && (
							<Loader2 className='size-4 shrink-0 animate-spin text-muted-foreground' />
						)}
					</div>

					{myJoinRequest && (
						<p className='mt-2 text-xs text-muted-foreground'>
							Cancela tu solicitud actual para enviar una nueva.
						</p>
					)}

					{!myJoinRequest && query.trim().length >= 2 && (
						<div className='mt-3 overflow-hidden rounded-lg border border-border bg-card'>
							{!searchingTeams && teamSearchResults.length === 0 && (
								<p className='px-3 py-4 text-center text-sm text-muted-foreground'>
									No se encontraron equipos con ese nombre
								</p>
							)}

							<ul className='max-h-56 divide-y divide-border overflow-y-auto'>
								{teamSearchResults.map((team) => (
									<li
										key={team._id}
										className='flex items-start justify-between gap-3 px-3 py-3'
									>
										<div className='min-w-0 flex-1'>
											<p className='truncate text-sm font-medium capitalize'>{team.name}</p>
											<p className='text-xs text-muted-foreground'>
												Propietario: {team.owner} · {team.membersCount} miembro
												{team.membersCount !== 1 ? 's' : ''}
											</p>
											{team.description && (
												<p className='mt-1 line-clamp-2 text-xs text-muted-foreground'>
													{team.description}
												</p>
											)}
										</div>
										<Button
											type='button'
											size='sm'
											disabled={loading || team.hasPendingRequest}
											className='shrink-0 gap-1'
											onClick={() => dispatch(requestJoinTeam(team._id, team.name))}
										>
											{team.hasPendingRequest ? (
												<>
													<Clock className='size-3.5' />
													Pendiente
												</>
											) : (
												<>
													<UserRoundPlus className='size-3.5' />
													Solicitar
												</>
											)}
										</Button>
									</li>
								))}
							</ul>
						</div>
					)}

					{!myJoinRequest && query.trim().length > 0 && query.trim().length < 2 && (
						<p className='mt-2 text-xs text-muted-foreground'>
							Escribe al menos 2 caracteres para buscar
						</p>
					)}
				</ModalSection>
			</ModalShell>
		</Modal>
	);
};
