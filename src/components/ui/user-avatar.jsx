import { cn } from '@/lib/utils';

const sizeClasses = {
	sm: 'size-8 text-xs',
	md: 'size-10 text-sm',
	lg: 'size-20 text-2xl',
	xl: 'size-28 text-3xl',
};

export function UserAvatar({ name, avatar, size = 'md', className }) {
	const initial = name?.charAt(0)?.toUpperCase() || 'U';

	if (avatar) {
		return (
			<img
				src={avatar}
				alt={name || 'Avatar'}
				className={cn('shrink-0 rounded-full object-cover', sizeClasses[size], className)}
			/>
		);
	}

	return (
		<div
			className={cn(
				'flex shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground',
				sizeClasses[size],
				className
			)}
		>
			{initial}
		</div>
	);
}
