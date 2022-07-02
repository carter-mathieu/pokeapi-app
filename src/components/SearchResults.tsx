import React, { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import PokeItem from "./PokeItem";
import { getPokemons, reset } from "../features/pokeSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const SearchResults = () => {
	// import the pokemon state
	const { pokemons, isSuccess, isLoading } = useSelector((state: RootState) => state.pokemon);

	// handle search field text state
	const [searchText, setSearchText] = useState("");

	// handle filter state
	const [filter, setFilter] = useState("");

	// import dispatch
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getPokemons());
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	const handleChange = (e: any) => {
		setSearchText(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (searchText === "") {
			toast.error("Please Enter a Pokemon Name");
		} else {
			setFilter(searchText);
			setSearchText("");
		}
	};

	const pokemonsToShow = filter && filter !== "" ? pokemons.filter(pokemon => pokemon.name === filter) : pokemons;

	if (pokemonsToShow.length === 0 && filter !== "") {
		toast.error(`No Pokemon with Name ${filter} Found`, { toastId: 1 });
	}

	if (isLoading) {
		return <Spinner />;
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
