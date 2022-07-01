import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../features/pokeSlice";

const PokeProfile = () => {
	const { pokemon, isLoading, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.pokemon);

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams();

	useEffect(() => {
		dispatch(getPokemon(params.pokemonName as string));
	}, [dispatch, params.pokemonName]);

	// destructure pokemon object retrieved from API
	const {
		name: string,
		height: number,
		weight: number,
		types: Array<{ slot: number; type: {name: string}}>
	} = pokemon

	if (isLoading) {
		<p>Beep Boop</p>;
	}

	return (
		<div>
			<h1>PokeProfile</h1>
			{/* Individual Pokemon Profile info renders out here */}
		</div>
	);
};

export default PokeProfile;
