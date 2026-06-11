import {
	deleteAvatarService,
	getProfileService,
	updateProfileService,
	uploadAvatarService,
} from '../../services/profile-api.service';
import { authFormatUser, showSuccessMessage } from '../../utilities';
import { setUserProfile, startProfileLoading, finishProfileLoading } from '../slices/authSlice';

export const fetchProfile = () => async (dispatch) => {
	dispatch(startProfileLoading());
	const data = await getProfileService();

	if (data.ok) {
		dispatch(setUserProfile(authFormatUser(data.user).user));
	}

	dispatch(finishProfileLoading());
	return data;
};

export const updateProfile = (values) => async (dispatch) => {
	dispatch(startProfileLoading());
	const data = await updateProfileService(values);

	if (data.ok) {
		dispatch(setUserProfile(authFormatUser(data.user).user));
		showSuccessMessage(data.message || 'Perfil actualizado');
	}

	dispatch(finishProfileLoading());
	return data.ok;
};

export const uploadProfileAvatar = (file) => async (dispatch) => {
	dispatch(startProfileLoading());
	const data = await uploadAvatarService(file);

	if (data.ok) {
		dispatch(setUserProfile(authFormatUser(data.user).user));
		showSuccessMessage(data.message || 'Foto actualizada');
	}

	dispatch(finishProfileLoading());
	return data.ok;
};

export const deleteProfileAvatar = () => async (dispatch) => {
	dispatch(startProfileLoading());
	const data = await deleteAvatarService();

	if (data.ok) {
		dispatch(setUserProfile(authFormatUser(data.user).user));
		showSuccessMessage(data.message || 'Foto eliminada');
	}

	dispatch(finishProfileLoading());
	return data.ok;
};
