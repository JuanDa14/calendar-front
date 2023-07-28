import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../redux';

const initialState = {
	email: '',
};

const ForgotPasswordPage = () => {
	const dispatch = useDispatch();

	const [values, setValues] = useState(initialState);

	const { checking } = useSelector((state) => state.auth);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(values));
	};

	return (
		<div className='container h-screen mx-auto'>
			<div className='flex h-full justify-center items-center px-6'>
				<div className='w-full xl:w-3/4 lg:w-11/12 flex shadow'>
					<div
						className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'
						style={{
							backgroundImage: `url('https://source.unsplash.com/oWTW-jNGl9I/600x800')`,
						}}
					></div>
					<div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
						<div className='px-8 text-center'>
							<h3 className='pt-4 mb-2 text-step-2 capitalize font-bold'>
								Recupera tu cuenta
							</h3>
							<p className='mb-4 text-sm text-gray-700'>
								Simplemente ingrese su dirección de correo electrónico a continuación y le
								enviaremos un enlace para restablecer su contraseña!
							</p>
						</div>
						<form className='px-8 pt-2 pb-8 mb-4 bg-white rounded' onSubmit={onSubmit}>
							<div className='mb-4'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='email'
								>
									Correo electrónico
								</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline'
									id='email'
									type='email'
									placeholder='Ingresa tu correo electrónico...'
									onChange={(e) => setValues({ ...values, email: e.target.value })}
									value={values.email}
									name='email'
									required
								/>
							</div>
							<div className='mb-6 text-center'>
								<button
									disabled={checking}
									className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
									type='submit'
								>
									{checking ? 'Enviando...' : 'Enviar correo electrónico'}
								</button>
							</div>
							<hr className='mb-6 border-t' />
							<div className='text-center'>
								<Link
									to={'/auth/register'}
									className='inline-block text-sm text-blue-500 align-baseline
										hover:text-blue-800'
								>
									Crear una cuenta
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

export default ForgotPasswordPage;
