import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Loader2, Search, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { clearSearchResults } from '@/redux/slices/teamSlice';
import { addedMembers, saveAddedMembers, searchMembers } from '@/redux/thunks/team';

export const MemberSearch = () => {
	const dispatch = useDispatch();
	const [query, setQuery] = useState('');
	const [selectedIds, setSelectedIds] = useState(new Set());
	const { searchResults, searching, members, owner, loading } = useSelector((state) => state.team);
	const { uid } = useSelector((state) => state.auth.user);
	const isExistingTeam = Boolean(owner?._id);
	const isOwnerAdding = isExistingTeam && uid === owner._id;

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

	useEffect(() => {
		setSelectedIds(new Set());
	}, [searchResults]);

	const memberIds = new Set(members.map((m) => m._id));
	const visibleResults = searchResults.filter(
		(user) => user._id !== uid && !memberIds.has(user._id)
	);

	const selectedUsers = visibleResults.filter((user) => selectedIds.has(user._id));
	const selectedCount = selectedUsers.length;

	const toggleUser = (userId) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(userId)) {
				next.delete(userId);
			} else {
				next.add(userId);
			}
			return next;
		});
	};

	const toggleAll = () => {
		if (selectedCount === visibleResults.length) {
			setSelectedIds(new Set());
		} else {
			setSelectedIds(new Set(visibleResults.map((user) => user._id)));
		}
	};

	const handleAddSelected = async () => {
		if (selectedCount === 0) return;

		if (isOwnerAdding) {
			await dispatch(saveAddedMembers(selectedUsers));
		} else {
			dispatch(addedMembers(selectedUsers));
		}

		setSelectedIds(new Set());
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

					{visibleResults.length > 0 && (
						<div className='flex items-center justify-between border-b border-border px-3 py-2'>
							<button
								type='button'
								onClick={toggleAll}
								className='text-xs font-medium text-primary hover:underline'
							>
								{selectedCount === visibleResults.length
									? 'Deseleccionar todos'
									: 'Seleccionar todos'}
							</button>
							{selectedCount > 0 && (
								<span className='text-xs text-muted-foreground'>
									{selectedCount} seleccionado{selectedCount !== 1 ? 's' : ''}
								</span>
							)}
						</div>
					)}

					<ul className='max-h-48 divide-y divide-border overflow-y-auto'>
						{visibleResults.map((user) => {
							const isSelected = selectedIds.has(user._id);

							return (
								<li key={user._id}>
									<button
										type='button'
										disabled={loading}
										onClick={() => toggleUser(user._id)}
										className={cn(
											'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/40',
											isSelected && 'bg-muted/50'
										)}
									>
										<div
											className={cn(
												'flex size-5 shrink-0 items-center justify-center rounded border transition-colors',
												isSelected
													? 'border-primary bg-primary text-primary-foreground'
													: 'border-input bg-background'
											)}
										>
											{isSelected && <Check className='size-3' />}
										</div>
										<div className='min-w-0 flex-1'>
											<p className='truncate text-sm font-medium capitalize'>
												{user.name}
											</p>
											<p className='truncate text-xs text-muted-foreground'>
												{user.email}
											</p>
										</div>
									</button>
								</li>
							);
						})}
					</ul>

					{selectedCount > 0 && (
						<div className='flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-3 py-2.5'>
							<p className='text-xs text-muted-foreground'>
								{selectedCount} usuario{selectedCount !== 1 ? 's' : ''} listo
								{selectedCount !== 1 ? 's' : ''} para agregar
							</p>
							<Button
								type='button'
								size='sm'
								disabled={loading}
								className='shrink-0 gap-1'
								onClick={handleAddSelected}
							>
								<UserPlus className='size-3.5' />
								Agregar seleccionados
							</Button>
						</div>
					)}
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
