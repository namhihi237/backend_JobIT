export const sendJobHtml = (posts) => {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link
			rel="stylesheet"
			href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
			integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
			crossorigin="anonymous"
		/>
	</head>
	<body class="container">
		<div class="list-item">
			<div class="card mb-3 item" style="max-width: 540px">
            ${renderItem(posts)}
			</div>
		</div>
	</body>
	<style>
		.container {
			display: flex;
			justify-content: center;
			height: 100%;
			overflow: hidden;
		}
		.item {
			align-self: center;
		}
		.list-item {
			margin-top: 100px;
			display: 'flex';
		}
		.logo {
			width : 200px;
			height: 200px;
		}
	</style>
</html>
`;
};

const renderItem = (posts) => {
	let rs = ``;
	for (let i = 0; i < posts.length; i++) {
		rs += `<div class="row no-gutters">
					<div class="col-md-4">
						<img src="${posts[i].company[0].image}" class="card-img logo" alt="..." />
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">${posts[i].company[0].name} Recruitment ${posts[i].title}</h5>
							<p class="card-text"><small class="text-muted">End time: ${posts[i].endTime}</small></p>
							<a href="https://goofy-mccarthy-a3ea23.netlify.app/">Click to apply Job</a><br/>
							<a href="https://goofy-mccarthy-a3ea23.netlify.app/">See more jobs here</a>
						</div>
					</div>
				</div>`;
	}
	return rs;
};
