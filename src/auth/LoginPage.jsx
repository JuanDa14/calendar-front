import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/ui';
import { loginUser } from '../redux';

const LoginPage = () => {
	const [values, setValues] = useState({
		email: 'jgamesterror@gmail.com',
		password: 'moralitos159',
	});

	const { checking } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(values));
	};

	if (checking) return <Spinner />;

	return (
		<div className='w-full mx-auto h-screen bg-slate-100'>
			<div className='container flex h-full items-center justify-center'>
				<div className='bg-white p-4 w-full max-w-2xl rounded-lg shadow-md'>
					<h1 className='text-step-3 font-bold uppercase mb-2 text-center'>Bienvenido</h1>
					<h2 className='text-center text-step-1 text-slate-400 font-semibold'>
						Comienza a organizarte de una manera rápida
					</h2>
					<form className='mt-4' onSubmit={onSubmit}>
						<div className='flex flex-col mb-2 max-w-lg mx-auto text-gray-500'>
							<label htmlFor='correo' className='text-step-0 mb-2'>
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
							<label htmlFor='contrasena' className='text-step-0 text-gray-500 mb-2'>
								Contraseña
							</label>
							<input
								value={values.password}
								name='password'
								required
								id='contrasena'
								minLength={6}
								type='password'
								className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
								placeholder='Ingresa tu contraseña'
								onChange={(e) => setValues({ ...values, password: e.target.value })}
							/>
						</div>
						<div className='mx-auto max-w-lg'>
							<button
								type='submit'
								className='w-full mt-2 text-step--1 bg-slate-700 rounded-lg py-2 text-white font-semibold hover:bg-slate-600 disabled:bg-slate-400 transition-colors duration-300'
							>
								Iniciar sesion
							</button>
						</div>
					</form>
					<div className='mt-3'>
						<Link to={'/auth/register'}>
							<p className='text-center text-step-0 text-slate-400 capitalize font-semibold'>
								¿No tienes una cuenta? <span className='underline'>Registrate</span>
							</p>
						</Link>
					</div>
					<div className='mt-3'>
						<Link to={'/auth/forgot-password'}>
							<p className='text-center text-step-0 text-slate-400 capitalize font-semibold hover:underline'>
								¿Olvidaste tu Contraseña?
							</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
