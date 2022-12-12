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
		<div className='w-full h-screen flex items-center mx-auto bg-slate-100'>
			<div className='w-full px-5'>
				<div className='max-w-4xl mx-auto text-center shadow-lg rounded-lg p-10 bg-white text-step--1'>
					<h1 className='font-bold text-step-3 mb-3 capitalize'>Recupera tu cuenta</h1>
					<span className='text-step-0 text-gray-500'>
						Ingresa tu correo electronico y te enviaremos un link para recuperar tu contraseña
					</span>

					<form className='mt-4' onSubmit={onSubmit}>
						<label
							htmlFor='correo'
							className='text-step-0 text-slate-500 text-start w-full mb-2'
						>
							Correo electrónico
						</label>
						<input
							type='email'
							name='email'
							id='email'
							required
							placeholder='Ingrese su correo electronico'
							className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
							onChange={(e) => setValues({ ...values, email: e.target.value })}
							value={values.email}
						/>

						<button
							disabled={checking}
							type='submit'
							className='w-full text-step--1 mt-2 bg-slate-700 rounded-lg py-2 text-white font-semibold hover:bg-slate-600 disabled:bg-slate-400 transition-colors duration-300'
						>
							{checking ? 'Enviando...' : 'Recuperar contraseña'}
						</button>
					</form>
					<div className='mt-3'>
						<p className='text-center text-step-0 text-slate-400 capitalize font-semibold'>
							¿Ya tienes una cuenta?{' '}
							<Link to='/auth/login' className='underline hover:text-slate-400'>
								Inicia sesión
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
