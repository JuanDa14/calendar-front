import { useDispatch, useSelector } from 'react-redux';
import { UserMinus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { deleteMember, removedMember } from '@/redux/thunks/team';

export const ButtonDeleteMember = ({ member }) => {
	const dispatch = useDispatch();
	const { uid } = useSelector((state) => state.auth.user);
	const { owner, loading } = useSelector((state) => state.team);

	const handleRemove = () => {
		if (uid === owner._id) {
			dispatch(deleteMember(member));
		} else {
			dispatch(removedMember(member));
		}
	};

	return (
		<Button
			type='button'
			variant='ghost'
			size='icon'
			disabled={loading}
			onClick={handleRemove}
			aria-label={`Eliminar ${member.name}`}
			className='shrink-0 text-destructive hover:text-destructive'
		>
			<UserMinus className='size-4' />
		</Button>
	);
};
