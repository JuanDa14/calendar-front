export const authFormatUser = (user) => ({
	user: {
		uid: user.uid,
		name: user.name,
		team: user.team,
	},
	verified: user.verified,
});
