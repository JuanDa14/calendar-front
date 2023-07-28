import { useSelector } from 'react-redux';
import { ButtonAddedMember } from '../ui';

export const ShowMember = () => {
	const { showMembers } = useSelector((state) => state.team);

	return (
		<>
			{showMembers.length > 0 && (
				<div className='flex flex-col'>
					<span className='font-semibold my-2 capitalize text-step--1 border-b'>
						Miembro Encontrado
					</span>
					{showMembers.map((member) => (
						<div key={member._id} className='mb-1.5 flex justify-between'>
							<p className='capitalize'>{member.name}</p>
							<ButtonAddedMember member={member} />
						</div>
					))}
				</div>
			)}
		</>
	);
};
