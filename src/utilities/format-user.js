export const authFormatUser = (user) => ({
	user: {
		uid: user.uid,
		name: user.name,
		email: user.email,
		team: user.team ?? null,
		avatar: user.avatar ?? null,
		bio: user.bio ?? '',
		phone: user.phone ?? '',
		jobTitle: user.jobTitle ?? '',
	},
	verified: user.verified,
});
