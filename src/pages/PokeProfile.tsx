import React, { useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../features/pokeSlice";

interface PokeProfileProps {
	name: string;
	height: number;
	weight: number;
	sprite: string;
	species: string;
	types: Array<{ slot: number; type: string }>;
}

const PokeProfile = () => {
	const { pokemon, isLoading, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.pokemon);

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams();

	useEffect(() => {
		dispatch(getPokemon(params.pokemonName as string));
	}, [dispatch, params.pokemonName]);

	// destructure pokemon object retrieved from API
	const { name, height, weight, sprite, species, types } = pokemon as PokeProfileProps;

	if (isLoading) {
		return <p>Beep Boop</p>;
	}

	return (
		<div>
			<div className="w-full mx-auto lg:w-10/12">
				<div className="mb-4">
					<Link to="/" className="btn btn-ghost">
						<BsFillArrowLeftCircleFill className="mr-2" size="24" />
						Back to Search
					</Link>
				</div>
			</div>
			<h1>PokeProfile</h1>
			<ul>
				<li>{name}</li>
				<li>{height}</li>
				<li>{weight}</li>
				{/* <ul>
					{pokemon?.types.map(type => (
						<li>{type.type}</li>
					))}
				</ul> */}
			</ul>
		</div>
	);
};

export default PokeProfile;
