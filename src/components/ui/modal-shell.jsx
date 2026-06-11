export const ModalShell = ({ icon: Icon, title, description, children, footer }) => (
	<div className='w-full p-6'>
		<div className='mb-6 flex items-start gap-4 pr-8'>
			<div className='flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted/50'>
				<Icon className='size-5 text-foreground' aria-hidden='true' />
			</div>
			<div className='min-w-0 flex-1 space-y-1'>
				<h2 className='text-lg font-semibold leading-none tracking-tight'>{title}</h2>
				{description && <p className='text-sm text-muted-foreground'>{description}</p>}
			</div>
		</div>

		<div className='space-y-5'>{children}</div>

		{footer && <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>{footer}</div>}
	</div>
);

export const ModalSection = ({ title, description, children }) => (
	<section className='space-y-3'>
		{(title || description) && (
			<div className='space-y-0.5'>
				{title && <h3 className='text-sm font-medium'>{title}</h3>}
				{description && <p className='text-xs text-muted-foreground'>{description}</p>}
			</div>
		)}
		{children}
	</section>
);
