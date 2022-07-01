import React, { useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { MdCatchingPokemon } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../features/pokeSlice";

interface PokeProfileProps {
	name: string;
	height: number;
	weight: number;
	sprite: string;
	abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>;
	types: Array<{ slot: number; type: { name: string; url: string } }>;
	base_experience: number;
}

const PokeProfile = () => {
	const { pokemon, isLoading, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.pokemon);

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams();

	useEffect(() => {
		console.log(params.pokemonName);
		dispatch(getPokemon(params.pokemonName as string));
	}, [dispatch, params.pokemonName]);

	// destructure pokemon object retrieved from API
	const { name, height, weight, sprite, abilities, types, base_experience } = pokemon as PokeProfileProps;

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
				<div className="container">
					<div className="stats shadow">
						<div className="stat">
							<div className="stat-figure text-primary">
								<MdCatchingPokemon size="36" />
							</div>
							<div className="stat-title">About</div>
							<div className="stat-value text-primary">{name}</div>
							{/* .charAt(0).toUpperCase() + name.slice(1) */}
							<div className="stat-desc">
								Height: {height}dm, Weight: {weight}hg
							</div>
						</div>
						<div className="stat">
							<div className="stat-figure text-secondary">{/* icon or img */}</div>
							<div className="stat-title">Ability</div>
							<div className="stat-value text-secondary">{abilities ? abilities[0].ability.name : ""}</div>
							<div className="stat-desc">Hidden: {abilities ? abilities[1].ability.name : ""}</div>
						</div>
						<div className="stat">
							<div className="stat-figure text-secondary">
								<div className="avatar">
									<div className="w-16 rounded-full">
										<img src={sprite} />
									</div>
								</div>
							</div>
							<div className="stat-title">Types</div>
							<div className="stat-title">
								{types ? (
									types.map(({ slot, type }) => (
										<div key={slot} className="badge badge-info mx-2 my-2">
											{type.name}
										</div>
									))
								) : (
									<div></div>
								)}
							</div>
							<div className="stat-desc">Base Experience: {base_experience}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokeProfile;
