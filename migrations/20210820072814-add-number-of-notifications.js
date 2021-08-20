module.exports = {
	async up(db, client) {
		// TODO write your migration here.
		// See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
		// Example:
		// await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
		console.log('start migrate add number of notifications');
		await db.collection('company').updateMany({}, { $set: { numberOfNotifications: 0 } });
		await db.collection('iter').updateMany({}, { $set: { numberOfNotifications: 0 } });
	},

	async down(db, client) {
		// TODO write the statements to rollback your migration (if possible)
		// Example:
		// await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
	},
};
////migrate-mongo up
