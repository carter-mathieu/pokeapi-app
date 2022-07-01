import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import pokeService from "./pokeService";

type Pokemon = {
	name: string;
	height: number;
	weight: number;
	sprite: string;
	species: string;
	types: Array<{ slot: number; type: string }>;
};

export interface PokeState {
	pokemons: Array<{ name: string; url: string }>;
	pokemon?: Pokemon;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	errorMessage: string;
}

const initialState: PokeState = {
	pokemons: [],
	pokemon: {} as Pokemon,
	isError: false,
	isSuccess: false,
	isLoading: false,
	errorMessage: "",
};

// Create funtion to submit get request to PokeAPI for all pokemon
export const getPokemons = createAsyncThunk("pokemons/getAll", async _ => {
	try {
		// Use a service for hitting the needed API endpoint
		return await pokeService.getPokemons();
	} catch (error) {
		console.log(error);
		throw new Error("Internal Server Error");
	}
});

// Create function to submit get request to PokeAPI for single pokemon
export const getPokemon = createAsyncThunk("pokemons/get", async (pokemonName: string) => {
	try {
		// Use a service for hitting the needed API endpoint
		return await pokeService.getPokemon(pokemonName);
	} catch (error) {
		console.log(error);
		throw new Error("Internal Server Error");
	}
});

// Create and export the slice
export const pokeSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {
		// TODO: make a reducers here
	},
	extraReducers: builder => {
		builder
			.addCase(getPokemons.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPokemons.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.pokemons = action.payload;
			})
			.addCase(getPokemons.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload as string;
			})
			.addCase(getPokemon.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPokemon.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.pokemon = action.payload as Pokemon;
			})
			.addCase(getPokemon.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload as string;
			});
	},
});

export default pokeSlice.reducer;
