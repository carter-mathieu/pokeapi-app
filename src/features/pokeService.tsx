import axios from "axios";

const POKEAPI_URL: string = "https://pokeapi.co/api/v2/";

// Call the API endpoint to get back all pokemon
const getPokemons = async () => {
	const response = await axios.get(`${POKEAPI_URL}pokemon`);
	return response.data.results;
};

// Call the API endpoint to get back a single pokemon
const getPokemon = async (pokemonName: string) => {
	const response = await axios.get(`${POKEAPI_URL}pokemon/${pokemonName}`);
	return response.data;
};

const pokeService = {
	getPokemons,
	getPokemon,
};

export default pokeService;
