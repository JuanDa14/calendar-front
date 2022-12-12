import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../redux';
import { isValidValuesOfResetPassword } from '../validators';

const initialState = {
	password: '',
	password2: '',
};

const ResetPassword = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();
	const navigate = useNavigate();

	const [values, setValues] = useState(initialState);

	const { checking } = useSelector((state) => state.auth);

	const onSubmit = async (e) => {
		e.preventDefault();

		const isValid = isValidValuesOfResetPassword(values);

		if (isValid) {
			const token = search.split('=')[1];
			await dispatch(resetPassword(token, values));
			navigate('/auth/login', { replace: true });
		}
	};

	return (
		<div className='w-full h-screen flex items-center mx-auto bg-slate-100'>
			<div className='w-full p-5'>
				<div className='max-w-4xl mx-auto text-center rounded-lg p-10 bg-white shadow-lg text-step--1'>
					<h1 className='font-bold text-step-3 mb-3'>Recupera tu contraseña</h1>
					<span className=' text-gray-500 text-step-0'>
						Restaure su contraseña y vuelva a ingresar a su cuenta
					</span>

					<form className='mt-4' onSubmit={onSubmit}>
						<input
							type='password'
							placeholder='Ingrese su nueva contraseña'
							name='password'
							required
							minLength={6}
							className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
							value={values.password}
							onChange={(e) => setValues({ ...values, password: e.target.value })}
						/>

						<input
							minLength={6}
							type='password'
							placeholder='Confirme su nueva contraseña'
							name='password2'
							required
							className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2'
							value={values.password2}
							onChange={(e) => setValues({ ...values, password2: e.target.value })}
						/>

						<button
							disabled={checking}
							type='submit'
							className='w-full text-step--1 mt-2 bg-slate-700 rounded-lg py-2 text-white font-semibold hover:bg-slate-600 disabled:bg-slate-400 transition-colors duration-300'
						>
							{checking ? 'Cargando...' : 'Restablecer contraseña'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
