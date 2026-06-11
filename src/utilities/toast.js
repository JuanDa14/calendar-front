import { toast } from 'sonner';

export const showSuccessMessage = (text) => {
	toast.success('Correcto', { description: text });
};

export const showErrorMessage = (text) => {
	toast.error('Error', { description: text });
};

export const showWarningMessage = (text) => {
	toast.warning('Advertencia', { description: text });
};

export const showInfoMessage = (text) => {
	toast.info('Información', { description: text });
};
