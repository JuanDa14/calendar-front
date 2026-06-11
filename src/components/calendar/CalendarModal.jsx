import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarPlus, X } from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createNote, updateNote } from '@/redux';
import { closeModal } from '@/redux/slices/uiSlice';

const initialValues = {
	title: '',
	notes: '',
	start: new Date(),
	end: new Date(),
};

export const CalendarModal = () => {
	const dispatch = useDispatch();
	const { note, loading } = useSelector((state) => state.note);
	const { uid, team } = useSelector((state) => state.auth.user);
	const { owner } = useSelector((state) => state.team);
	const [values, setValues] = useState(initialValues);

	useEffect(() => {
		if (note._id) {
			setValues(note);
		} else {
			setValues(initialValues);
		}
	}, [note._id]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (note._id) {
			dispatch(updateNote(values));
		} else {
			dispatch(createNote(values));
		}
	};

	const isDisabled =
		team
			? note._id
				? note.userId !== uid
					? owner._id !== uid
					: loading
				: loading
			: loading;

	return (
		<Modal>
			<div className='w-full max-w-md p-6'>
				<div className='mb-6 flex items-start gap-4'>
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
						<CalendarPlus className='h-6 w-6' />
					</div>
					<div>
						<h2 className='text-xl font-semibold'>
							{note._id ? 'Actualizar evento' : 'Nuevo evento'}
						</h2>
						<p className='text-sm text-muted-foreground'>
							{note._id ? 'Modifica los datos del evento' : 'Completa la información del evento'}
						</p>
					</div>
				</div>

				<form className='space-y-4' onSubmit={onSubmit}>
					<div className='space-y-2'>
						<Label htmlFor='title'>Título</Label>
						<Input
							id='title'
							placeholder='Reunión de equipo...'
							required
							minLength={3}
							value={values.title}
							onChange={(e) => setValues({ ...values, title: e.target.value })}
						/>
					</div>

					<div className='grid gap-4 sm:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='start'>Inicio</Label>
							<Input
								id='start'
								type='date'
								required
								value={new Date(values.start).toISOString().split('T')[0]}
								onChange={(e) => setValues({ ...values, start: e.target.value })}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='end'>Fin</Label>
							<Input
								id='end'
								type='date'
								required
								value={new Date(values.end).toISOString().split('T')[0]}
								onChange={(e) => setValues({ ...values, end: e.target.value })}
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='notes'>Descripción</Label>
						<Input
							id='notes'
							placeholder='Detalles adicionales...'
							value={values.notes || ''}
							onChange={(e) => setValues({ ...values, notes: e.target.value })}
						/>
					</div>

					<div className='flex gap-3 pt-2'>
						<Button
							type='button'
							variant='outline'
							className='flex-1'
							disabled={loading}
							onClick={() => dispatch(closeModal())}
						>
							<X className='h-4 w-4' />
							Cancelar
						</Button>
						<Button type='submit' className='flex-1' disabled={isDisabled}>
							{note._id ? 'Actualizar' : 'Crear'}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};
