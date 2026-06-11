import { useSelector } from 'react-redux';
import { User } from 'lucide-react';

import { ButtonDeleteMember } from '../ui';

export const AddedMember = () => {
	const { members } = useSelector((state) => state.team);

	if (members.length === 0) return null;

	return (
		<ul className='space-y-2'>
			{members.map((member) => (
				<li
					key={member._id}
					className='flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2.5'
				>
					<div className='flex min-w-0 items-center gap-2.5'>
						<div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
							<User className='size-4' />
						</div>
						<div className='min-w-0'>
							<p className='truncate text-sm font-medium capitalize'>{member.name}</p>
							{member.email && (
								<p className='truncate text-xs text-muted-foreground'>{member.email}</p>
							)}
						</div>
					</div>
					<ButtonDeleteMember member={member} />
				</li>
			))}
		</ul>
	);
};
