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
import { ModalSection, ModalShell } from '@/components/ui/modal-shell';
import { Separator } from '@/components/ui/separator';
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
			<ModalShell
				icon={CalendarPlus}
				title={note._id ? 'Editar evento' : 'Nuevo evento'}
				description={
					note._id
						? 'Actualiza la información del evento seleccionado'
						: 'Completa los campos para programar un nuevo evento'
				}
				footer={
					<>
						{note._id && canDelete && (
							<Button
								type='button'
								variant='destructive'
								disabled={loading}
								onClick={() => dispatch(deleteNote(note._id))}
								className='mr-auto w-full sm:w-auto'
							>
								<Trash2 className='size-4' />
								Eliminar
							</Button>
						)}
						<Button
							type='button'
							variant='outline'
							disabled={loading}
							onClick={() => dispatch(closeModal())}
						>
							<X className='size-4' />
							Cancelar
						</Button>
						<Button
							type='submit'
							form='event-form'
							disabled={isDisabled}
						>
							{loading && <Loader2 className='size-4 animate-spin' />}
							{note._id ? 'Guardar cambios' : 'Crear evento'}
						</Button>
					</>
				}
			>
				<Form {...form}>
					<form id='event-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
						<ModalSection title='Detalles'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Título</FormLabel>
										<FormControl>
											<Input
												placeholder='Reunión de equipo, entrega, etc.'
												className='w-full'
												disabled={isDisabled}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</ModalSection>

						<Separator />

						<ModalSection title='Fechas'>
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
						</ModalSection>

						<Separator />

						<ModalSection title='Notas adicionales'>
							<FormField
								control={form.control}
								name='notes'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Descripción</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Ubicación, agenda, participantes...'
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
						</ModalSection>
					</form>
				</Form>
			</ModalShell>
		</Modal>
	);
};
