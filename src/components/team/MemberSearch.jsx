import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, Search, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { clearSearchResults } from '@/redux/slices/teamSlice';
import { addedMember, saveAddedMember, searchMembers } from '@/redux/thunks/team';

export const MemberSearch = () => {
	const dispatch = useDispatch();
	const [query, setQuery] = useState('');
	const { searchResults, searching, members, owner, loading } = useSelector((state) => state.team);
	const { uid } = useSelector((state) => state.auth.user);
	const isExistingTeam = Boolean(owner?._id);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(searchMembers(query));
		}, 300);

		return () => clearTimeout(timer);
	}, [query, dispatch]);

	useEffect(
		() => () => {
			dispatch(clearSearchResults());
		},
		[dispatch]
	);

	const memberIds = new Set(members.map((m) => m._id));
	const visibleResults = searchResults.filter((user) => !memberIds.has(user._id));

	const handleAdd = (user) => {
		if (isExistingTeam && uid === owner._id) {
			dispatch(saveAddedMember({ email: user.email }));
		} else {
			dispatch(addedMember(user));
		}
		setQuery('');
		dispatch(clearSearchResults());
	};

	return (
		<div className='space-y-2'>
			<Label htmlFor='member-search'>Buscar por nombre o email</Label>
			<div
				className={cn(
					'flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3',
					'transition-colors focus-within:ring-1 focus-within:ring-ring/30'
				)}
			>
				<Search className='size-4 shrink-0 text-muted-foreground' aria-hidden='true' />
				<input
					id='member-search'
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Escribe al menos 2 caracteres...'
					autoComplete='off'
					className='flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
				/>
				{searching && (
					<Loader2
						className='size-4 shrink-0 animate-spin text-muted-foreground'
						aria-label='Buscando'
					/>
				)}
			</div>

			{query.trim().length >= 2 && (
				<div className='overflow-hidden rounded-lg border border-border bg-card'>
					{!searching && visibleResults.length === 0 && (
						<p className='px-3 py-4 text-center text-sm text-muted-foreground'>
							No se encontraron usuarios disponibles
						</p>
					)}
					<ul className='max-h-48 divide-y divide-border overflow-y-auto'>
						{visibleResults.map((user) => (
							<li
								key={user._id}
								className='flex items-center justify-between gap-3 px-3 py-2.5 transition-colors hover:bg-muted/40'
							>
								<div className='min-w-0 flex-1'>
									<p className='truncate text-sm font-medium capitalize'>{user.name}</p>
									<p className='truncate text-xs text-muted-foreground'>{user.email}</p>
								</div>
								<Button
									type='button'
									size='sm'
									variant='secondary'
									disabled={loading}
									className='shrink-0 gap-1'
									onClick={() => handleAdd(user)}
								>
									<UserPlus className='size-3.5' />
									Agregar
								</Button>
							</li>
						))}
					</ul>
				</div>
			)}

			{query.trim().length > 0 && query.trim().length < 2 && (
				<p className='text-xs text-muted-foreground'>
					Escribe al menos 2 caracteres para buscar
				</p>
			)}
		</div>
	);
};
