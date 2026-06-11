import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserMinus, UserPlus, Users, X } from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { clearShowMembers } from '@/redux/slices/teamSlice';
import { closeModalMembers } from '@/redux/slices/uiSlice';
import { deleteMember, deleteTeam } from '@/redux/thunks/team';
import { InputMemberSearch } from './InputMemberSearch';
import { ShowMember } from './ShowMember';

export const MembersModal = () => {
	const dispatch = useDispatch();
	const [addedMember, setAddedMember] = useState(false);
	const { members, owner, loading } = useSelector((state) => state.team);
	const { team, uid } = useSelector((state) => state.auth.user);
	const isOwner = uid === owner._id;

	return (
		<Modal>
			<div className='w-full max-w-md p-6'>
				<div className='mb-6 flex items-start gap-4'>
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
						<Users className='h-6 w-6' />
					</div>
					<div>
						<h2 className='text-xl font-semibold capitalize'>{team}</h2>
						<p className='text-sm text-muted-foreground'>
							Owner: <span className='capitalize'>{owner.name}</span>
						</p>
					</div>
				</div>

				{isOwner && (
					<div className='mb-4 flex flex-wrap gap-2'>
						<Button
							variant='destructive'
							size='sm'
							disabled={loading}
							onClick={async () => {
								await dispatch(deleteTeam());
								dispatch(closeModalMembers());
							}}
						>
							Eliminar equipo
						</Button>
						{!addedMember ? (
							<Button
								size='sm'
								disabled={loading}
								onClick={() => setAddedMember(true)}
							>
								<UserPlus className='h-4 w-4' />
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
					<p className='text-sm font-medium text-muted-foreground'>Miembros del equipo</p>
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
											<UserMinus className='h-4 w-4 text-destructive' />
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
						<X className='h-4 w-4' />
						Cerrar
					</Button>
				</div>
			</div>
		</Modal>
	);
};
