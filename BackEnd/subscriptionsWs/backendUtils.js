const axios = require("axios")

//utils file
//this is how we can access the 2 REST APIs and get the data we need,
//and fill it inside the subscriptionsDB in mongo

//to -> members collection, from -> jsonplaceholder
const insertMembersData = async (to, from) => {
	let currentMembers = await (await axios.default.get(to)).data;
	if (currentMembers.length === 0) {
		let users = await (await axios.default.get(from)).data;
		let members = users.map((user) => {
			return {
				name: user.name,
				email: user.email,
				city: user.address.city,
			}
		})
		members.forEach((member) => { axios.default.post(to, member) })
	}
}

//to -> movies collection, from -> tvmaze
const insertMoviesData = async (to, from) => {
	let currentMovies = await (await axios.default.get(to)).data;
	if (currentMovies.length === 0) {
		let moviesData = await (await axios.default.get(from)).data;
		let movies = moviesData.slice(0, 10).map((movie) => {
			return {
				name: movie.name,
				genres: movie.genres,
				image: movie.image.medium,
				premiered: movie.premiered,
			}
		})
		movies.forEach((movie) => { axios.default.post(to, movie) })
	}
}

module.exports = { insertMembersData, insertMoviesData };
