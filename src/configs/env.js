require('dotenv').config();

export const envVariables = {
	port: process.env.PORT || 5000,
	mongoURI:
		process.env.DB_URI ||
		'mongodb+srv://cnpm:cnpm17t1@cluster0.n1nom.mongodb.net/jobIT?retryWrites=true&w=majority',
	jwtSecret: process.env.JWT_SECRET || 'doancnpm!@#',
	nodeEnv: process.env.NODE_ENV || 'development',
	subject: process.env.SUBJECT || '[CODE RESET :]',
	cloud_name: process.env.CLOUD_NAME || 'do-an-cnpm',
	api_key: process.env.API_KEY_CLOUD || '484176915684615',
	api_secret: process.env.API_SECRET_CLOUD || 'hpWWOxyc-cm_Egs5bqRF4UzPJf8',
	key_admin: '123qwe!@#',
	url_fe: 'http://localhost/',
	SENDGRID_API_KEY:
		process.env.SENDGRID_API_KEY || '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',
	VERIFIED_SENDER: process.env.VERIFIED_SENDER || 'poppy99.dev@gmail.com',
	gmail: 'poppy99.dev@gmail.com',
	pass: 'Namvippro23799@',
};
