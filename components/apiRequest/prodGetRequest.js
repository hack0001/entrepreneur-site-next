const prodRestApiRequest = async endPoint => {
	const res = await fetch(
		`${process.env.REACT_APP_PRODUCTION_MANUAL_ENDPOINT}${endPoint}`, //process.env.REACT_APP_PROD_ENDPOINT,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"x-api-key": process.env.REACT_APP_PRODUCTION_MANUAL_API_KEY, //process.env.REACT_APP_PROD_API_KEY,
			},
		},
	);

	const json = await res.json();
	if (json.errors) {
		console.error(json.errors);
		throw new Error("Failed to fetch API");
	}
	return json;
};

export default prodRestApiRequest;
