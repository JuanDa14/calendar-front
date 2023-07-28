import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/ui';
import { loginUser } from '../redux';

const LoginPage = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const { checking } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(values));
	};

	if (checking) return <Spinner />;

	return (
		<div className='container h-screen mx-auto'>
			<div className='flex h-full items-center justify-center px-6'>
				<div className='w-full xl:w-3/4 lg:w-11/12 flex shadow'>
					<div
						className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'
						style={{
							backgroundImage: `url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
					></div>
					<div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
						<h3 className='pt-4 text-center capitalize text-step-2 font-bold'>
							Bienvenido de nuevo!
						</h3>
						<form className='px-8 pt-6 pb-8 mb-4 bg-white rounded' onSubmit={onSubmit}>
							<div className='mb-4'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='username'
								>
									Correo electrónico
								</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline'
									id='username'
									required
									type='text'
									placeholder='juandev@gmail.com'
									onChange={(e) => setValues({ ...values, email: e.target.value })}
									name='email'
									value={values.email}
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='password'
								>
									Contraseña
								</label>
								<input
									required
									className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline'
									id='password'
									type='password'
									placeholder='******************'
									minLength={6}
									onChange={(e) => setValues({ ...values, password: e.target.value })}
									name='password'
									value={values.password}
								/>
							</div>
							<div className='mb-4'>
								<input className='mr-2 leading-tight' type='checkbox' id='checkbox_id' />
								<label className='text-sm' htmlFor='checkbox_id'>
									Recuerdame
								</label>
							</div>
							<div className='mb-6 text-center'>
								<button
									className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
									type='submit'
								>
									Iniciar Sesión
								</button>
							</div>
							<hr className='mb-6 border-t' />
							<div className='text-center'>
								<Link
									to={'/auth/register'}
									className='inline-block text-sm text-blue-500 align-baseline
										hover:text-blue-800'
								>
									¿No tienes una cuenta? Registrate
								</Link>
							</div>
							<div className='text-center'>
								<Link
									to={'/auth/forgot-password'}
									className='inline-block text-sm text-blue-500 align-baseline hover:text-blue-800'
								>
									¿Olvidaste tu Contraseña?
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
