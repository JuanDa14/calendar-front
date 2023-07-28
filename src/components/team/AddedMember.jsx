import { useSelector } from 'react-redux';
import { ButtonDeleteMember } from '../ui';

export const AddedMember = () => {
	const { members } = useSelector((state) => state.team);

	return (
		<div>
			{members.map((member) => (
				<div key={member._id} className='flex justify-between gap-2 items-center mb-2'>
					<span className='font-normal text-gray-400'>{member.name}</span>
					<ButtonDeleteMember member={member} />
				</div>
			))}
		</div>
	);
};
