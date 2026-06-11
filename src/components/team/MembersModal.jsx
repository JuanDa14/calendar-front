import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Loader2,
	Save,
	Settings2,
	Trash2,
	User,
	UserMinus,
	Users,
	X,
} from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ModalSection, ModalShell } from '@/components/ui/modal-shell';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { closeModalMembers } from '@/redux/slices/uiSlice';
import { deleteMember, deleteTeam, updateTeam } from '@/redux/thunks/team';
import { MemberSearch } from './MemberSearch';

export const MembersModal = () => {
	const dispatch = useDispatch();
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
			<ModalShell
				icon={Users}
				title={team}
				description={`Propietario: ${owner.name || '—'}`}
			>
				{isOwner && (
					<div className='flex rounded-lg border p-1'>
						<button
							type='button'
							className={cn(
								'flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
								activeTab === 'members'
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
							)}
							onClick={() => setActiveTab('members')}
						>
							<Users className='size-4' />
							Miembros
						</button>
						<button
							type='button'
							className={cn(
								'flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
								activeTab === 'settings'
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
							)}
							onClick={() => setActiveTab('settings')}
						>
							<Settings2 className='size-4' />
							Configuración
						</button>
					</div>
				)}

				{activeTab === 'settings' && isOwner ? (
					<form onSubmit={handleUpdateTeam} className='space-y-5'>
						<ModalSection title='Datos del equipo'>
							<div className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='edit-team-name'>Nombre</Label>
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
											setEditValues({
												...editValues,
												description: e.target.value,
											})
										}
										rows={3}
										className='w-full resize-none'
										placeholder='Describe tu equipo...'
									/>
								</div>
							</div>
						</ModalSection>

						<div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-between'>
							<Button
								type='button'
								variant='destructive'
								disabled={loading}
								onClick={async () => {
									await dispatch(deleteTeam());
									dispatch(closeModalMembers());
								}}
							>
								<Trash2 className='size-4' />
								Eliminar equipo
							</Button>
							<div className='flex flex-col-reverse gap-2 sm:flex-row'>
								<Button
									type='button'
									variant='outline'
									onClick={() => dispatch(closeModalMembers())}
								>
									Cancelar
								</Button>
								<Button type='submit' disabled={loading}>
									{loading ? (
										<Loader2 className='size-4 animate-spin' />
									) : (
										<Save className='size-4' />
									)}
									Guardar cambios
								</Button>
							</div>
						</div>
					</form>
				) : (
					<div className='space-y-5'>
						{isOwner && (
							<ModalSection
								title='Agregar miembros'
								description='Busca por nombre o email. Los resultados aparecen en tiempo real.'
							>
								<MemberSearch />
							</ModalSection>
						)}

						{isOwner && <Separator />}

						<ModalSection
							title={`Miembros (${members.length})`}
							description='Personas que forman parte de este equipo'
						>
							{members.length === 0 ? (
								<div className='rounded-lg border border-dashed px-4 py-8 text-center'>
									<p className='text-sm text-muted-foreground'>
										Aún no hay miembros en el equipo
									</p>
								</div>
							) : (
								<ul className='space-y-2'>
									{members.map((member) => (
										<li
											key={member._id}
											className='flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2.5'
										>
											<div className='flex min-w-0 items-center gap-2.5'>
												<div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
													<User className='size-4' />
												</div>
												<div className='min-w-0'>
													<p className='truncate text-sm font-medium capitalize'>
														{member.name}
													</p>
													{member.email && (
														<p className='truncate text-xs text-muted-foreground'>
															{member.email}
														</p>
													)}
												</div>
											</div>
											{isOwner && (
												<Button
													variant='ghost'
													size='icon'
													disabled={loading}
													onClick={() => dispatch(deleteMember(member))}
													aria-label={`Eliminar ${member.name}`}
													className='shrink-0 text-destructive hover:text-destructive'
												>
													<UserMinus className='size-4' />
												</Button>
											)}
										</li>
									))}
								</ul>
							)}
						</ModalSection>

						<div className='flex justify-end'>
							<Button variant='outline' onClick={() => dispatch(closeModalMembers())}>
								<X className='size-4' />
								Cerrar
							</Button>
						</div>
					</div>
				)}
			</ModalShell>
		</Modal>
	);
};
