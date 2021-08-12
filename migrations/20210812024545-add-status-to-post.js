module.exports = {
	async up(db, client) {
		console.log('start migrate add follow and status post');
		const posts = await db.collection('post').find().toArray();
		console.log(posts);
		const updatePostPromise = posts.map((post) => {
			let newApply = post.apply
				? post.apply.map((apply) => {
						apply.status = 'pending';
						console.log(apply);
						return apply;
				  })
				: [];
			return db.collection('post').updateOne({ _id: post._id }, { $set: { apply: newApply } });
		});
		await Promise.all(updatePostPromise);
	},

	async down(db, client) {
		// TODO write the statements to rollback your migration (if possible)
		// Example:
		// await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
	},
};
