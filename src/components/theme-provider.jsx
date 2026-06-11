import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeProviderContext = createContext({
	theme: 'system',
	resolvedTheme: 'light',
	setTheme: () => null,
});

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'calendar-theme' }) {
	const [theme, setThemeState] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
	const [resolvedTheme, setResolvedTheme] = useState('light');

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');

		let resolved = theme;
		if (theme === 'system') {
			resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}

		root.classList.add(resolved);
		setResolvedTheme(resolved);
	}, [theme]);

	useEffect(() => {
		if (theme !== 'system') return undefined;

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => {
			const resolved = media.matches ? 'dark' : 'light';
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(resolved);
			setResolvedTheme(resolved);
		};

		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			resolvedTheme,
			setTheme: (newTheme) => {
				localStorage.setItem(storageKey, newTheme);
				setThemeState(newTheme);
			},
		}),
		[theme, resolvedTheme, storageKey]
	);

	return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (!context) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};
