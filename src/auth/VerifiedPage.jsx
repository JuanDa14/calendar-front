import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { verifiedEmail } from '../redux';
import { Spinner } from '../components/ui';

const VerifiedPage = () => {
	const dispatch = useDispatch();

	const { verified } = useSelector((state) => state.auth);

	const { search } = useLocation();

	useEffect(() => {
		const token = search.split('=')[1];

		if (token) {
			dispatch(verifiedEmail(token));
		}
	}, []);

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
								Confirmar cuenta!
							</h3>
							<p className='mb-4 text-step--1 text-gray-700'>
								Gracias por registrarte! Estamos confirmando tu cuenta, para que puedas
								iniciar sesión. Por favor, ten paciencia, esto puede tardar unos minutos.
							</p>
						</div>

						<div className='flex justify-center items-center mb-4'>
							{verified ? (
								<Link
									to={'/auth/login'}
									className='w-full text-center px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:shadow-outline'
								>
									Iniciar sesión
								</Link>
							) : (
								<Spinner className={'h-full'} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifiedPage;
