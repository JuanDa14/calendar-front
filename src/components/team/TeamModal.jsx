import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Users, X } from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ModalSection, ModalShell } from '@/components/ui/modal-shell';
import { Separator } from '@/components/ui/separator';
import { closeCreateTeamModal, createTeam } from '@/redux/thunks/team';
import { AddedMember } from './AddedMember';
import { MemberSearch } from './MemberSearch';

const initialState = { name: '', description: '' };

export const TeamModal = () => {
	const dispatch = useDispatch();
	const { members, loading, owner } = useSelector((state) => state.team);
	const { team, uid } = useSelector((state) => state.auth.user);
	const isMemberOfAnotherTeam = Boolean(team) && owner?._id !== uid;
	const inviteMembers = members.filter((member) => member._id !== uid);
	const [values, setValues] = useState(initialState);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTeam(values));
	};

	return (
		<Modal>
			<ModalShell
				icon={Users}
				title={isMemberOfAnotherTeam ? 'Crear mi equipo' : 'Crear equipo'}
				description={
					isMemberOfAnotherTeam
						? 'Al crear tu equipo saldrás del actual. Invita miembros antes de publicarlo.'
						: 'Configura tu equipo e invita miembros antes de publicarlo'
				}
				footer={
					<>
						<Button type='button' variant='outline' onClick={() => dispatch(closeCreateTeamModal())}>
							<X className='size-4' />
							Cancelar
						</Button>
						<Button
							type='submit'
							form='create-team-form'
							disabled={loading || inviteMembers.length === 0 || values.name.length < 3}
						>
							<Check className='size-4' />
							{loading ? 'Creando...' : 'Crear equipo'}
						</Button>
					</>
				}
			>
				<form id='create-team-form' onSubmit={onSubmit} className='space-y-5'>
					<ModalSection title='Información del equipo'>
						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='team-name'>Nombre</Label>
								<Input
									id='team-name'
									placeholder='Equipo de desarrollo'
									required
									minLength={3}
									className='w-full'
									value={values.name}
									onChange={(e) => setValues({ ...values, name: e.target.value })}
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='team-description'>Descripción</Label>
								<Textarea
									id='team-description'
									placeholder='¿Para qué es este equipo?'
									rows={2}
									className='w-full resize-none'
									value={values.description}
									onChange={(e) =>
										setValues({ ...values, description: e.target.value })
									}
								/>
							</div>
						</div>
					</ModalSection>

					<Separator />

					<ModalSection
						title='Invitar miembros'
						description='Busca usuarios, selecciona varios y agrégalos de una vez.'
					>
						<MemberSearch />
					</ModalSection>

					{inviteMembers.length > 0 && (
						<ModalSection
							title={`Miembros seleccionados (${inviteMembers.length})`}
							description='Estos usuarios se agregarán al crear el equipo'
						>
							<AddedMember />
						</ModalSection>
					)}
				</form>
			</ModalShell>
		</Modal>
	);
};
