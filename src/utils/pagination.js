export const pagination = async (model, condition, page, take, except) => {
	let result = [];
	page = isNaN(page) ? 1 : page - 0;
	take = isNaN(take) ? 10 : take - 0;
	let count = await model.countDocuments(condition);
	let numPages = Math.ceil(count / take);

	if (page > numPages || page <= 0)
		return {
			page,
			numPages,
			result,
		};
	const skip = (page - 1) * take;
	result = await model
		.find(condition, { __v: 0, updatedAt: 0, ...except })
		.skip(skip)
		.limit(take);
	return {
		page,
		numPages,
		result,
	};
};
