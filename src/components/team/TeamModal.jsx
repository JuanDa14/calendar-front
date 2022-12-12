import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTeam } from '../../redux/thunks/team';
import { Modal } from '../ui';
import { AddedMember, InputMemberSearch, ShowMember } from './index';

const initialState = {
	name: '',
	description: '',
	member: '',
};

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
			<h1 className='font-semibold text-step-1 mb-2 text-gray-400'>Nuevo Grupo</h1>
			<hr />
			<form onSubmit={onSubmit}>
				<div className='mt-2 mb-2'>
					<label htmlFor='grupo' className='text-gray-500 mb-1'>
						Nombre del grupo
					</label>
					<input
						id='grupo'
						type='text'
						className='w-full border border-gray-300 rounded-md p-2'
						placeholder='Ingrese el nombre del grupo'
						name='name'
						autoComplete='off'
						value={values.title}
						onChange={(e) => setValues({ ...values, name: e.target.value })}
						required
						minLength={6}
					/>
				</div>
				<div className='mt-2 mb-2'>
					<label htmlFor='description' className='text-gray-500 mb-1'>
						Descripción del grupo
					</label>
					<textarea
						id='description'
						type='text'
						className='w-full border border-gray-300 rounded-md p-2 resize-none'
						placeholder='Ingrese una descripción'
						name='description'
						autoComplete='off'
						rows={2.5}
						value={values.title}
						onChange={(e) => setValues({ ...values, description: e.target.value })}
					/>
				</div>

				<div className='mt-2 mb-2'>
					<label htmlFor='miembros' className='text-gray-500 mb-1'>
						Miembros
					</label>
					<InputMemberSearch />

					{showMembers.length > 0 && <ShowMember />}

					{members.length > 0 && <AddedMember />}
				</div>

				<button
					type='submit'
					disabled={loading}
					className='bg-blue-500 text-sm w-full text-center hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4 flex items-center justify-center gap-1 disabled:bg-blue-300'
				>
					<span>{loading ? 'Cargando...' : 'Crear grupo'}</span>
				</button>
			</form>
		</Modal>
	);
};
