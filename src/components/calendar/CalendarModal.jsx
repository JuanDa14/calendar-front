import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarPlus, Loader2, Trash2, X } from 'lucide-react';

import { Modal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { eventSchema } from '@/lib/validations/auth';
import { useEventPermissions } from '@/hooks/useEventPermissions';
import { createNote, deleteNote, updateNote } from '@/redux';
import { closeModal } from '@/redux/slices/uiSlice';

export const CalendarModal = () => {
	const dispatch = useDispatch();
	const { note, loading } = useSelector((state) => state.note);
	const { canEdit, canDelete } = useEventPermissions(note._id, note.userId);

	const form = useForm({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: '',
			notes: '',
			start: new Date(),
			end: new Date(),
		},
	});

	useEffect(() => {
		if (note._id || note.start) {
			form.reset({
				title: note.title || '',
				notes: note.notes || '',
				start: note.start ? new Date(note.start) : new Date(),
				end: note.end ? new Date(note.end) : new Date(),
			});
		} else {
			form.reset({ title: '', notes: '', start: new Date(), end: new Date() });
		}
	}, [note._id, note.start, note.end, form]);

	const onSubmit = (values) => {
		if (note._id) {
			dispatch(updateNote({ ...note, ...values }));
		} else {
			dispatch(createNote(values));
		}
	};

	const isDisabled = loading || (note._id && !canEdit);

	return (
		<Modal>
			<div className='w-full p-6'>
				<div className='mb-6 flex items-start gap-4 pr-8'>
					<div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
						<CalendarPlus className='size-6' aria-hidden='true' />
					</div>
					<div className='min-w-0 flex-1 space-y-1'>
						<DialogTitle>{note._id ? 'Actualizar evento' : 'Nuevo evento'}</DialogTitle>
						<DialogDescription>
							{note._id
								? 'Modifica los datos del evento seleccionado'
								: 'Completa la información para crear un nuevo evento'}
						</DialogDescription>
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Título</FormLabel>
									<FormControl>
										<Input
											placeholder='Reunión de equipo...'
											className='w-full'
											disabled={isDisabled}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid w-full gap-4 sm:grid-cols-2'>
							<FormField
								control={form.control}
								name='start'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Inicio</FormLabel>
										<FormControl>
											<DatePicker
												value={field.value}
												onChange={field.onChange}
												disabled={isDisabled}
												placeholder='Fecha de inicio'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='end'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Fin</FormLabel>
										<FormControl>
											<DatePicker
												value={field.value}
												onChange={field.onChange}
												disabled={isDisabled}
												placeholder='Fecha de fin'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='notes'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Detalles adicionales...'
											className='w-full resize-none'
											rows={3}
											disabled={isDisabled}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex flex-col gap-3 pt-2'>
							<div className='flex gap-3'>
								<Button
									type='button'
									variant='outline'
									className='flex-1'
									disabled={loading}
									onClick={() => dispatch(closeModal())}
								>
									<X className='size-4' />
									Cancelar
								</Button>
								<Button type='submit' className='flex-1' disabled={isDisabled}>
									{loading && <Loader2 className='size-4 animate-spin' />}
									{note._id ? 'Actualizar' : 'Crear'}
								</Button>
							</div>
							{note._id && canDelete && (
								<Button
									type='button'
									variant='destructive'
									className='w-full'
									disabled={loading}
									onClick={() => dispatch(deleteNote(note._id))}
								>
									<Trash2 className='size-4' />
									Eliminar evento
								</Button>
							)}
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};
