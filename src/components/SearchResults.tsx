import React, { useEffect } from "react";
import type { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import PokeItem from "./PokeItem";
import { getPokemons } from "../features/pokeSlice";

const SearchResults = () => {
	// import the pokemon state
	const { pokemons, isError, isSuccess, isLoading, errorMessage } = useSelector((state: RootState) => state.pokemon);

	// import dispatch
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch]);

	if (isLoading) {
		return <p>Beep Boop</p>;
	}

	return (
		<div>
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{pokemons.map((pokemon: any) => (
					<PokeItem key={pokemon.name} pokemon={pokemon} />
				))}
			</div>
		</div>
	);
};

export default SearchResults;
