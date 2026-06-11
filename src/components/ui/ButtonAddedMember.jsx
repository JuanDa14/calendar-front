import { useDispatch, useSelector } from 'react-redux';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { addedMember, saveAddedMember } from '@/redux/thunks/team';

export const ButtonAddedMember = ({ member }) => {
	const dispatch = useDispatch();
	const { uid } = useSelector((state) => state.auth.user);
	const { owner, loading } = useSelector((state) => state.team);

	const handleAdd = () => {
		if (uid === owner._id) {
			dispatch(saveAddedMember({ email: member.email }));
		} else {
			dispatch(addedMember(member));
		}
	};

	return (
		<Button type='button' size='sm' variant='secondary' disabled={loading} onClick={handleAdd}>
			<UserPlus className='size-4' />
			Agregar
		</Button>
	);
};
