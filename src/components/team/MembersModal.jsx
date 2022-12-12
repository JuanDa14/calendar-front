import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearShowMembers } from '../../redux/slices/teamSlice';
import { closeModalMembers } from '../../redux/slices/uiSlice';
import { deleteMember, deleteTeam } from '../../redux/thunks/team';
import { Modal } from '../ui';
import { InputMemberSearch } from './InputMemberSearch';
import { ShowMember } from './ShowMember';

export const MembersModal = () => {
	const dispatch = useDispatch();

	const [addedMember, setAddedMember] = useState(false);

	const { members, owner, loading } = useSelector((state) => state.team);
	const { team, uid } = useSelector((state) => state.auth.user);

	return (
		<Modal>
			<p className='flex gap-2 mb-2 font-bold text-gray-500 text-step-1 capitalize'>
				Nombre del team:<span className='text-gray-400 font-semibold'>{team}</span>
			</p>
			<hr />
			<div className='flex items-center justify-between gap-2 mt-2'>
				<p className='flex gap-2 font-semibold text-step-0 text-gray-500 capitalize'>
					Lider:
					<span className='text-gray-400'>{owner.name}</span>
				</p>

				{uid === owner._id && (
					<>
						<button
							disabled={loading}
							type='button'
							onClick={async () => {
								await dispatch(deleteTeam());
								dispatch(closeModalMembers());
							}}
							className='py-1.5 px-2 text-sm font-medium text-white bg-slate-600 rounded-lg  hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 disabled:bg-slate-300'
						>
							Eliminar Equipo
						</button>
						{!addedMember ? (
							<button
								disabled={loading}
								onClick={() => setAddedMember(true)}
								type='button'
								className='py-1.5 px-2 text-sm font-medium text-white bg-blue-500 rounded-lg  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-blue-300'
							>
								Agregar Miembro
							</button>
						) : (
							<button
								disabled={loading}
								onClick={() => {
									dispatch(clearShowMembers());
									setAddedMember(false);
								}}
								type='button'
								className='py-1.5 px-2 text-sm font-medium text-white bg-red-500 rounded-lg  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-red-300'
							>
								Cancelar
							</button>
						)}
					</>
				)}
			</div>
			{/* Buscar nuevo miembro */}
			{addedMember && <InputMemberSearch />}
			{/* Mostrar miembros agregados */}
			<ShowMember />
			<span className='flex font-semibold text-step-0 text-gray-500 my-1.5'>Miembros</span>
			<ul className='text-step-0'>
				{members.map((member, index) => (
					<li key={member._id} className='flex gap-2 items-center mb-2'>
						<span className='font-normal text-step--1 text-gray-400'>
							{index + 1}. {member.name}
						</span>
						{uid === owner._id && (
							<button
								disabled={loading}
								type='button'
								onClick={() => dispatch(deleteMember(member))}
								className='py-1.5 px-2 text-sm font-medium text-white bg-red-500 rounded-lg  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-red-300'
							>
								Eliminar
							</button>
						)}
					</li>
				))}
			</ul>
		</Modal>
	);
};
