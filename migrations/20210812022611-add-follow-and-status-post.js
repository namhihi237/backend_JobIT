//npm install -g migrate-mongo
//migrate-mongo init
//migrate-mongo create name-of-my-script
//migrate-mongo up
module.exports = {
	async up(db, client) {
		console.log('start migrate add follow');
		await db.collection('company').updateMany({}, { $set: { numberOfFollowers: 0 } });
	},

	async down(db, client) {
		// TODO write the statements to rollback your migration (if possible)
		// Example:
		// await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
	},
};
