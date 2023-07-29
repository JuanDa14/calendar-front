import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/ui';

import { registerUser } from '../redux';
import { isValidValuesOfRegister } from '../validators';

const initialState = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const RegisterPage = () => {
	const [values, setValues] = useState(initialState);

	const { checking } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		const isValid = isValidValuesOfRegister(values);

		if (isValid) {
			dispatch(registerUser(values));
		}

		setValues(initialState);
	};

	if (checking) return <Spinner />;

	return (
		<div className='container h-screen mx-auto'>
			<div className='flex h-full items-center justify-center px-6'>
				<div className='w-full xl:w-3/4 lg:w-11/12 flex shadow'>
					<div
						className='w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg'
						style={{
							backgroundImage: `url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
					></div>
					<div className='w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none'>
						<h3 className='pt-4 text-step-2 font-bold text-center capitalize'>
							Crea una cuenta!
						</h3>
						<form className='px-8 pt-6 pb-8 mb-4 bg-white rounded' onSubmit={onSubmit}>
							<div>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='usuario'
									>
										Nombre de usuario
									</label>
									<input
										className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
										id='usuario'
										type='text'
										placeholder='Juandeveloper'
										name='usuario'
										value={values.name}
										required
										minLength={3}
										onChange={(e) => setValues({ ...values, name: e.target.value })}
									/>
								</div>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='email'
								>
									Correo electrónico
								</label>
								<input
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
									id='email'
									type='email'
									placeholder='juandev@gmail.com'
									name='email'
									value={values.email}
									required
									onChange={(e) => setValues({ ...values, email: e.target.value })}
								/>
							</div>
							<div className='md:flex md:justify-between'>
								<div className='mb-4 md:mr-2 md:mb-0'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='password'
									>
										Constraseña
									</label>
									<input
										className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow-sm appearance-none focus:shadow-outline'
										id='password'
										type='password'
										placeholder='******************'
										name='password'
										value={values.password}
										required
										minLength={6}
										onChange={(e) => setValues({ ...values, password: e.target.value })}
									/>
								</div>
								<div className='md:ml-2'>
									<label
										className='block mb-2 text-sm font-bold text-gray-700'
										htmlFor='confirmPassword'
									>
										Confirmar contraseña
									</label>
									<input
										className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
										id='confirmPassword'
										type='password'
										placeholder='******************'
										name='confirmPassword'
										value={values.confirmPassword}
										required
										minLength={6}
										onChange={(e) =>
											setValues({ ...values, confirmPassword: e.target.value })
										}
									/>
								</div>
							</div>
							<div className='mb-6 text-center'>
								<button
									className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:shadow-outline'
									type='submit'
								>
									Registrar cuenta
								</button>
							</div>
							<hr className='mb-6 border-t' />
							<div className='text-center'>
								<Link
									to={'/auth/forgot-password'}
									className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
									href='#'
								>
									¿Olvidaste tu Contraseña?
								</Link>
							</div>
							<div className='text-center'>
								<Link
									to='/auth/login'
									className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
								>
									¿Ya tienes una cuenta? Inicia sesión!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
