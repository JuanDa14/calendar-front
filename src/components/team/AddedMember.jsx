import { useDispatch, useSelector } from 'react-redux';
import { removedMember } from '../../redux/thunks/team';
import { ButtonDeleteMember } from '../ui';

export const AddedMember = () => {
	const { members } = useSelector((state) => state.team);

	const dispatch = useDispatch();

	return (
		<div className='mt-2'>
			<span className='font-semibold text-blue-500 capitalize text-lg flex mb-1'>
				Miembros Agregados
			</span>
			{members.map((member) => (
				<div key={member._id} className='flex gap-2 items-center mb-2'>
					<span className='font-normal text-gray-400'>{member.name}</span>
					<ButtonDeleteMember member={member} />
				</div>
			))}
		</div>
	);
};
