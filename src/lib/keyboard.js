export const getSearchShortcut = () => {
	if (typeof navigator === 'undefined') return 'Ctrl+K';
	return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘K' : 'Ctrl+K';
};
