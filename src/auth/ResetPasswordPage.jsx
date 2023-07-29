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
		<div className='container h-screen mx-auto'>
			<div className='flex h-full justify-center items-center px-6'>
				<div className='w-full xl:w-3/4 lg:w-11/12 flex shadow'>
					<div
						className='w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg'
						style={{
							backgroundImage: `url('https://source.unsplash.com/oWTW-jNGl9I/600x800')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
					></div>
					<div className='w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none'>
						<div className='px-8 text-center'>
							<h3 className='pt-4 mb-2 text-step-2 capitalize font-bold'>
								Restablecer contraseña
							</h3>
							<p className='mb-4 text-sm text-gray-700'>
								Simplemente ingrese su nueva contraseña y confírmela para restablecerla.
							</p>
						</div>
						<form className='px-8 pt-2 pb-8 mb-4 bg-white rounded' onSubmit={onSubmit}>
							<div className='mb-4'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='password'
								>
									Contraseña
								</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
									id='password'
									type='password'
									placeholder='************'
									onChange={(e) => setValues({ ...values, password: e.target.value })}
									value={values.password}
									name='password'
									required
									minLength={6}
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block mb-2 text-sm font-bold text-gray-700'
									htmlFor='password2'
								>
									Confirmar contraseña
								</label>
								<input
									className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow-sm appearance-none focus:shadow-outline'
									id='password2'
									type='password'
									placeholder='************'
									onChange={(e) => setValues({ ...values, password2: e.target.value })}
									value={values.password2}
									name='password2'
									required
									minLength={6}
								/>
							</div>
							<div className='mb-6 text-center'>
								<button
									disabled={checking}
									className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:shadow-outline'
									type='submit'
								>
									{checking ? 'Cargando...' : 'Restablecer contraseña'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
