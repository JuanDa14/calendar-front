import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, Save, Settings2, UserMinus, UserPlus, Users, X } from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { clearShowMembers } from '@/redux/slices/teamSlice';
import { closeModalMembers } from '@/redux/slices/uiSlice';
import { deleteMember, deleteTeam, updateTeam } from '@/redux/thunks/team';
import { InputMemberSearch } from './InputMemberSearch';
import { ShowMember } from './ShowMember';

export const MembersModal = () => {
	const dispatch = useDispatch();
	const [addedMember, setAddedMember] = useState(false);
	const [editValues, setEditValues] = useState({ name: '', description: '' });
	const { members, owner, loading, description } = useSelector((state) => state.team);
	const { teamModalTab } = useSelector((state) => state.ui);
	const { team, uid } = useSelector((state) => state.auth.user);
	const isOwner = uid === owner._id;
	const [activeTab, setActiveTab] = useState(teamModalTab);

	useEffect(() => {
		setActiveTab(teamModalTab);
	}, [teamModalTab]);

	useEffect(() => {
		setEditValues({ name: team || '', description: description || '' });
	}, [team, description]);

	const handleUpdateTeam = (e) => {
		e.preventDefault();
		dispatch(updateTeam(editValues));
	};

	return (
		<Modal>
			<div className='w-full max-w-md p-6'>
				<div className='mb-4 flex items-start gap-4'>
					<div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
						<Users className='size-6' />
					</div>
					<div className='min-w-0 flex-1'>
						<h2 className='truncate text-xl font-semibold capitalize'>{team}</h2>
						<p className='text-sm text-muted-foreground'>
							Owner: <span className='capitalize'>{owner.name}</span>
						</p>
					</div>
				</div>

				{isOwner && (
					<div className='mb-4 flex rounded-lg border p-1'>
						<button
							type='button'
							className={cn(
								'flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
								activeTab === 'members'
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
							onClick={() => setActiveTab('members')}
						>
							<Users className='size-4' />
							Miembros
						</button>
						<button
							type='button'
							className={cn(
								'flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
								activeTab === 'settings'
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
							onClick={() => setActiveTab('settings')}
						>
							<Settings2 className='size-4' />
							Configuración
						</button>
					</div>
				)}

				{activeTab === 'settings' && isOwner ? (
					<form onSubmit={handleUpdateTeam} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='edit-team-name'>Nombre del equipo</Label>
							<Input
								id='edit-team-name'
								value={editValues.name}
								onChange={(e) =>
									setEditValues({ ...editValues, name: e.target.value })
								}
								required
								minLength={3}
								className='w-full'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='edit-team-description'>Descripción</Label>
							<Textarea
								id='edit-team-description'
								value={editValues.description}
								onChange={(e) =>
									setEditValues({ ...editValues, description: e.target.value })
								}
								rows={3}
								className='w-full resize-none'
								placeholder='Describe tu equipo...'
							/>
						</div>
						<div className='flex gap-3'>
							<Button
								type='button'
								variant='outline'
								className='flex-1'
								onClick={() => dispatch(closeModalMembers())}
							>
								Cancelar
							</Button>
							<Button type='submit' className='flex-1' disabled={loading}>
								{loading ? (
									<Loader2 className='size-4 animate-spin' />
								) : (
									<Save className='size-4' />
								)}
								Guardar
							</Button>
						</div>
						<Button
							type='button'
							variant='destructive'
							className='w-full'
							disabled={loading}
							onClick={async () => {
								await dispatch(deleteTeam());
								dispatch(closeModalMembers());
							}}
						>
							Eliminar equipo
						</Button>
					</form>
				) : (
					<>
						{isOwner && (
							<div className='mb-4 flex flex-wrap gap-2'>
								{!addedMember ? (
									<Button
										size='sm'
										disabled={loading}
										onClick={() => setAddedMember(true)}
									>
										<UserPlus className='size-4' />
										Agregar miembro
									</Button>
								) : (
									<Button
										variant='outline'
										size='sm'
										disabled={loading}
										onClick={() => {
											dispatch(clearShowMembers());
											setAddedMember(false);
										}}
									>
										Cancelar
									</Button>
								)}
							</div>
						)}

						{addedMember && (
							<div className='mb-4'>
								<InputMemberSearch />
							</div>
						)}

						<ShowMember />

						<div className='mt-4 space-y-2'>
							<p className='text-sm font-medium text-muted-foreground'>
								Miembros del equipo
							</p>
							{members.length === 0 ? (
								<p className='rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground'>
									No hay miembros en el equipo
								</p>
							) : (
								<ul className='space-y-2'>
									{members.map((member, index) => (
										<li
											key={member._id}
											className='flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2'
										>
											<span className='text-sm'>
												<span className='font-medium'>{index + 1}.</span>{' '}
												<span className='capitalize'>{member.name}</span>
											</span>
											{isOwner && (
												<Button
													variant='ghost'
													size='icon'
													disabled={loading}
													onClick={() => dispatch(deleteMember(member))}
													aria-label={`Eliminar ${member.name}`}
												>
													<UserMinus className='size-4 text-destructive' />
												</Button>
											)}
										</li>
									))}
								</ul>
							)}
						</div>

						<div className='mt-6'>
							<Button
								variant='outline'
								className='w-full'
								onClick={() => dispatch(closeModalMembers())}
							>
								<X className='size-4' />
								Cerrar
							</Button>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
};
