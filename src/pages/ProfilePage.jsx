import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2, Save, Trash2, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { profileSchema } from '@/lib/validations/auth';
import {
	deleteProfileAvatar,
	fetchProfile,
	updateProfile,
	uploadProfileAvatar,
} from '@/redux/thunks/profile';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const fileInputRef = useRef(null);
	const { user, profileLoading } = useSelector((state) => state.auth);

	const form = useForm({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: '',
			bio: '',
			phone: '',
			jobTitle: '',
		},
	});

	useEffect(() => {
		dispatch(fetchProfile());
	}, [dispatch]);

	useEffect(() => {
		form.reset({
			name: user.name || '',
			bio: user.bio || '',
			phone: user.phone || '',
			jobTitle: user.jobTitle || '',
		});
	}, [user.name, user.bio, user.phone, user.jobTitle, form]);

	const onSubmit = (values) => {
		dispatch(updateProfile(values));
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			dispatch(uploadProfileAvatar(file));
		}
		e.target.value = '';
	};

	const handleDeleteAvatar = () => {
		dispatch(deleteProfileAvatar());
	};

	return (
		<div className='flex-1 overflow-auto'>
			<div className='mx-auto max-w-2xl space-y-8 p-6'>
				<div className='space-y-1'>
					<h1 className='text-2xl font-semibold tracking-tight'>Mi perfil</h1>
					<p className='text-sm text-muted-foreground'>
						Actualiza tu foto y datos personales
					</p>
				</div>

				<section className='rounded-xl border bg-card p-6'>
					<div className='mb-4 flex items-center gap-2'>
						<Camera className='size-4 text-muted-foreground' />
						<h2 className='text-sm font-medium'>Foto de perfil</h2>
					</div>

					<div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
						<div className='relative'>
							<UserAvatar name={user.name} avatar={user.avatar} size='xl' />
							{profileLoading && (
								<div className='absolute inset-0 flex items-center justify-center rounded-full bg-background/60'>
									<Loader2 className='size-6 animate-spin' />
								</div>
							)}
						</div>

						<div className='space-y-2'>
							<p className='text-sm text-muted-foreground'>
								JPG, PNG, WEBP o GIF. Máximo 5 MB.
							</p>
							<div className='flex flex-wrap gap-2'>
								<input
									ref={fileInputRef}
									type='file'
									accept='image/jpeg,image/png,image/webp,image/gif'
									className='hidden'
									onChange={handleFileChange}
								/>
								<Button
									type='button'
									variant='outline'
									size='sm'
									disabled={profileLoading}
									onClick={() => fileInputRef.current?.click()}
								>
									<Camera className='size-4' />
									{user.avatar ? 'Cambiar foto' : 'Subir foto'}
								</Button>
								{user.avatar && (
									<Button
										type='button'
										variant='ghost'
										size='sm'
										disabled={profileLoading}
										className='text-destructive hover:text-destructive'
										onClick={handleDeleteAvatar}
									>
										<Trash2 className='size-4' />
										Eliminar foto
									</Button>
								)}
							</div>
						</div>
					</div>
				</section>

				<section className='rounded-xl border bg-card p-6'>
					<div className='mb-4 flex items-center gap-2'>
						<User className='size-4 text-muted-foreground' />
						<h2 className='text-sm font-medium'>Datos personales</h2>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input placeholder='Tu nombre' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input value={user.email || ''} disabled readOnly />
								</FormControl>
								<p className='text-xs text-muted-foreground'>
									El correo no se puede cambiar desde aquí
								</p>
							</FormItem>

							<FormField
								control={form.control}
								name='jobTitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cargo / rol</FormLabel>
										<FormControl>
											<Input placeholder='Ej. Desarrollador, Diseñador...' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Teléfono</FormLabel>
										<FormControl>
											<Input placeholder='+34 600 000 000' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='bio'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Biografía</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Cuéntanos un poco sobre ti...'
												className='resize-none'
												rows={4}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Separator />

							<div className='flex justify-end'>
								<Button type='submit' disabled={profileLoading}>
									{profileLoading ? (
										<Loader2 className='size-4 animate-spin' />
									) : (
										<Save className='size-4' />
									)}
									Guardar cambios
								</Button>
							</div>
						</form>
					</Form>
				</section>
			</div>
		</div>
	);
};

export default ProfilePage;
