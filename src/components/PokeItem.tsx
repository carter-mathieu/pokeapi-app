import React from "react";
import { TbPokeball } from "react-icons/tb";
import { Link } from "react-router-dom";

interface PokeItemProps {
	key: string;
	pokemon: { name: string; url: string };
}

const PokeItem = ({ pokemon }: PokeItemProps) => {
	return (
		<div className="card bg-primary text-primary-content">
			<div className="card-body">
				<div className="card-actions justify-between">
					<h2 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
					<TbPokeball size="48" />
				</div>
				<div className="card-actions justify-end mt-2">
					<Link className="btn" to={`/${pokemon.name}`}>
						More Info
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PokeItem;
