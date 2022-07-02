import React, { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import PokeItem from "./PokeItem";
import { getPokemons, reset } from "../features/pokeSlice";

const SearchResults = () => {
	// import the pokemon state
	const { pokemons, isError, isSuccess, isLoading, errorMessage } = useSelector((state: RootState) => state.pokemon);

	// handle search field text state
	const [searchText, setSearchText] = useState("");

	// handle filter state
	const [filter, setFilter] = useState("");

	// import dispatch
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch]);

	const handleChange = (e: any) => {
		setSearchText(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (searchText === "") {
			console.log("enter something");
		} else {
			setFilter(searchText);
			setSearchText("");
		}
	};

	const pokemonsToShow = filter && filter !== "" ? pokemons.filter(pokemon => pokemon.name === filter) : pokemons;

	if (isLoading) {
		return <p>Beep Boop</p>;
	}

	return (
		// TODO:: Add pagination
		<div className="mt-4">
			<div className="flex flex-row justify-start">
				<form className="flex" onSubmit={handleSubmit}>
					<input name="filter" value={searchText} type="text" placeholder="Search..." className="input w-full max-w-xs mx-6 mb-4" onChange={handleChange} />
					<button className="btn" type="submit">
						Search
					</button>
				</form>
				<button
					className="btn btn-ghost mx-2"
					onClick={() => {
						setFilter("");
						setSearchText("");
					}}
				>
					Clear Search
				</button>
			</div>
			<div className="px-4 grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{pokemonsToShow.map((pokemon: any) => (
					<PokeItem key={pokemon.name} pokemon={pokemon} />
				))}
			</div>
		</div>
	);
};

export default SearchResults;
