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
import { createTeam } from '@/redux/thunks/team';
import { closeModalTeam } from '@/redux/slices/uiSlice';
import { AddedMember } from './AddedMember';
import { MemberSearch } from './MemberSearch';

const initialState = { name: '', description: '' };

export const TeamModal = () => {
	const dispatch = useDispatch();
	const { members, loading } = useSelector((state) => state.team);
	const [values, setValues] = useState(initialState);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTeam(values));
	};

	return (
		<Modal>
			<ModalShell
				icon={Users}
				title='Crear equipo'
				description='Configura tu equipo e invita miembros antes de publicarlo'
				footer={
					<>
						<Button type='button' variant='outline' onClick={() => dispatch(closeModalTeam())}>
							<X className='size-4' />
							Cancelar
						</Button>
						<Button
							type='submit'
							form='create-team-form'
							disabled={loading || members.length === 0 || values.name.length < 3}
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
						description='Busca usuarios por nombre o email. Los resultados se filtran mientras escribes.'
					>
						<MemberSearch />
					</ModalSection>

					{members.length > 0 && (
						<ModalSection
							title={`Miembros seleccionados (${members.length})`}
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
