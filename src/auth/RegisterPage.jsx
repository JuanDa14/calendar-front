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
		<div className=' bg-slate-100'>
			<div className='w-full mx-auto h-screen container'>
				<div className='flex h-full items-center justify-center'>
					<div className='bg-white p-4 w-full max-w-2xl rounded-lg shadow'>
						<h1 className='text-step-3 font-bold uppercase mb-3 text-center'>Registrate</h1>
						<h2 className='text-center text-step-1 text-slate-400 font-semibold'>
							¿Ya tienes una cuenta?{' '}
							<Link to='/auth/login' className='underline hover:text-slate-400'>
								Inicia sesión
							</Link>
						</h2>
						<form className='mt-4' onSubmit={onSubmit}>
							<div className='flex flex-col mb-2 max-w-lg mx-auto'>
								<label htmlFor='usuario' className='text-step-0 text-slate-500 mb-2'>
									Nombre de usuario
								</label>
								<input
									value={values.name}
									name='usuario'
									required
									id='usuario'
									type='text'
									minLength={3}
									className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
									placeholder='Ingresa tu nombre de usuario'
									onChange={(e) => setValues({ ...values, name: e.target.value })}
								/>
							</div>
							<div className='flex flex-col mb-2 max-w-lg mx-auto'>
								<label htmlFor='correo' className='text-step-0 text-slate-500 mb-2'>
									Correo electrónico
								</label>
								<input
									value={values.email}
									name='email'
									required
									id='correo'
									type='email'
									className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
									placeholder='Ingresa tu correo electronico'
									onChange={(e) => setValues({ ...values, email: e.target.value })}
								/>
							</div>
							<div className='flex flex-col mb-2 max-w-lg mx-auto'>
								<label htmlFor='contrasena' className='text-step-0 text-slate-500 mb-2'>
									Contraseña
								</label>
								<input
									value={values.password}
									name='password'
									required
									minLength={6}
									id='contrasena'
									type='password'
									className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
									placeholder='Ingresa tu contraseña'
									onChange={(e) => setValues({ ...values, password: e.target.value })}
								/>
							</div>
							<div className='flex flex-col mb-2 max-w-lg mx-auto'>
								<label
									htmlFor='confirmar-contrasena'
									className='text-step-0 text-slate-500 mb-2'
								>
									Confirmar Contraseña
								</label>
								<input
									value={values.confirmPassword}
									name='confirmPassword'
									required
									minLength={6}
									id='confirmar-contrasena'
									type='password'
									className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
									placeholder='Confirma tu contraseña'
									onChange={(e) =>
										setValues({ ...values, confirmPassword: e.target.value })
									}
								/>
							</div>
							<div className='mx-auto max-w-lg'>
								<button
									type='submit'
									className='w-full mt-2 text-step--1 bg-slate-700 rounded-lg py-2 text-white font-semibold hover:bg-slate-600 disabled:bg-slate-400 transition-colors duration-300'
								>
									Registrarse
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
