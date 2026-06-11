import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, X, Check } from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTeam } from '@/redux/thunks/team';
import { closeModalTeam } from '@/redux/slices/uiSlice';
import { AddedMember, InputMemberSearch, ShowMember } from './index';

const initialState = { name: '', description: '', member: '' };

export const TeamModal = () => {
	const dispatch = useDispatch();
	const { members, loading, showMembers } = useSelector((state) => state.team);
	const [values, setValues] = useState(initialState);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTeam(values));
	};

	return (
		<Modal>
			<div className='w-full p-6'>
				<div className='mb-6 flex items-start gap-4'>
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
						<Users className='h-6 w-6' />
					</div>
					<div>
						<h2 className='text-xl font-semibold'>Nuevo equipo</h2>
						<p className='text-sm text-muted-foreground'>
							Completa el formulario para crear tu equipo
						</p>
					</div>
				</div>

				<form onSubmit={onSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='team-name'>Nombre del grupo</Label>
						<Input
							id='team-name'
							placeholder='Developers...'
							required
							minLength={6}
							value={values.name}
							onChange={(e) => setValues({ ...values, name: e.target.value })}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='team-description'>Descripción</Label>
						<Input
							id='team-description'
							placeholder='Equipo de desarrolladores...'
							value={values.description}
							onChange={(e) => setValues({ ...values, description: e.target.value })}
						/>
					</div>

					<div className='space-y-2'>
						<Label>Buscar miembro</Label>
						<InputMemberSearch />
					</div>

					{showMembers.length > 0 && <ShowMember />}

					{members.length > 0 && (
						<div className='space-y-2'>
							<Label>Miembros agregados</Label>
							<AddedMember />
						</div>
					)}

					<div className='flex gap-3 pt-2'>
						<Button
							type='button'
							variant='outline'
							className='flex-1'
							onClick={() => dispatch(closeModalTeam())}
						>
							<X className='h-4 w-4' />
							Cerrar
						</Button>
						<Button
							type='submit'
							className='flex-1'
							disabled={loading || members.length === 0}
						>
							<Check className='h-4 w-4' />
							{loading ? 'Creando...' : 'Crear grupo'}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};
