import axios from "axios";

const POKEAPI_URL: string = "https://pokeapi.co/api/v2/";

// Call the API endpoint to get back all pokemon
const getPokemons = async () => {
	const response = await axios.get(`${POKEAPI_URL}pokemon`);

	if (response.status !== 200) {
		const message = "The Pokedex Could Not Connect";
		return message;
	}

	return response.data.results;
};

// Call the API endpoint to get back a single pokemon
const getPokemon = async (pokemonName: string) => {
	const response = await axios.get(`${POKEAPI_URL}pokemon/${pokemonName}`);

	if (response.status !== 200) {
		const message = "The Pokemon Could Not Be Found";
		return message;
	}

	const pokeData = {
		name: response.data.name,
		height: response.data.height,
		weight: response.data.weight,
		forms: response.data.forms,
		sprite: response.data.sprites.front_default,
		species: response.data.species.name,
		types: response.data.types,
	};

	return pokeData;
};

const pokeService = {
	getPokemons,
	getPokemon,
};

export default pokeService;
