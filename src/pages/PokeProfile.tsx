import React, { useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { MdCatchingPokemon } from "react-icons/md";
import { GiMeshNetwork } from "react-icons/gi";
import { useParams, Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../features/pokeSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

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
	const { pokemon, isLoading, isError, errorMessage } = useSelector((state: RootState) => state.pokemon);

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
		}
		dispatch(getPokemon(params.pokemonName as string));
	}, [dispatch, params.pokemonName, isError, errorMessage]);

	// destructure pokemon object retrieved from API
	const { name, height, weight, sprite, abilities, types, base_experience } = pokemon as PokeProfileProps;

	if (isLoading) {
		return <Spinner />;
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
					<div className="stats shadow bg-base-200">
						<div className="stat">
							<div className="stat-figure text-primary">
								<div className="avatar">
									<div className="w-20 rounded-full">
										<img src={sprite} />
									</div>
								</div>
							</div>
							<div className="stat-title">About</div>
							<div className="stat-value text-primary">{name ? name.charAt(0).toUpperCase() + name.slice(1) : ""}</div>
							{/* .charAt(0).toUpperCase() + name.slice(1) */}
							<div className="stat-desc">
								Height: {height}dm, Weight: {weight}hg
							</div>
						</div>
						<div className="stat">
							<div className="stat-figure text-desc">
								<GiMeshNetwork size="36" />
							</div>
							<div className="stat-title">Ability</div>
							<div className="stat-value text-secondary">{abilities ? abilities[0].ability.name.charAt(0).toUpperCase() + abilities[0].ability.name.slice(1) : ""}</div>
							<div className="stat-desc">Hidden: {abilities ? abilities[1].ability.name.charAt(0).toUpperCase() + abilities[1].ability.name.slice(1) : ""}</div>
						</div>
						<div className="stat">
							<div className="stat-figure text-desc">
								<MdCatchingPokemon size="36" />
							</div>
							<div className="stat-title">Types</div>
							<div className="stat-title">
								{types ? (
									types.map(({ slot, type }) => (
										<div key={slot} className="badge badge-info mx-2 my-2">
											{type.name.charAt(0).toUpperCase() + type.name.slice(1)}
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
