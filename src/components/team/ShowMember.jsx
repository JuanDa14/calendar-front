import { useSelector } from 'react-redux';
import { ButtonAddedMember } from '../ui';

export const ShowMember = () => {
	const { showMembers } = useSelector((state) => state.team);

	return (
		<>
			{showMembers.length > 0 && (
				<div className='flex flex-col mt-2'>
					<span className='font-semibold text-gray-500 capitalize text-lg'>
						Miembro Encontrado
					</span>
					{showMembers.map((member) => (
						<div key={member._id} className='mb-1.5'>
							<span>{member.name}</span>
							<ButtonAddedMember member={member} />
						</div>
					))}
				</div>
			)}
		</>
	);
};
