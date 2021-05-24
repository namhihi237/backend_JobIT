import mongoose from 'mongoose';
import log from 'datalog';
export const dbConnection = (uri) => {
	try {
		mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		const db = mongoose.connection;
		db.once('open', () => {
			log.info(`Connected to database`);
		});
	} catch (error) {
		log.error(error);
	}
};
