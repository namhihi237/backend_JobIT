require('dotenv').config();

export const envVariables = {
	port: process.env.PORT || 5000,
	mongoURI:
		process.env.DB_URI ||
		'',
	jwtSecret: process.env.JWT_SECRET || 'doancnpm!@#',
	nodeEnv: process.env.NODE_ENV || 'development',
	subject: process.env.SUBJECT || 'CODE RESET PASSWORD',
	cloud_name: process.env.CLOUD_NAME || 'do-an-cnpm',
	api_key: process.env.API_KEY_CLOUD || '',
	api_secret: process.env.API_SECRET_CLOUD || '',
	key_admin: '123qwe!@#',
	url_fe: 'https://it-jobs-app.netlify.app/#',
	SENDGRID_API_KEY:
		process.env.SENDGRID_API_KEY || '',
	VERIFIED_SENDER: process.env.VERIFIED_SENDER || 'poppy99.dev@gmail.com',
	gmail: 'poppy99.dev@gmail.com',
	pass: process.env.PASSWORD || '',
};
