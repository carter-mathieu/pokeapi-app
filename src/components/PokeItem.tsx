import React from "react";
import { Link } from "react-router-dom";

interface PokeItemProps {
	key: string;
	pokemon: { name: string; url: string };
}

const PokeItem = ({ pokemon }: PokeItemProps) => {
	return (
		<div className="card w-96 bg-primary text-primary-content">
			<div className="card-body">
				<div>{/* put some img or icon here */}</div>
				<div>
					<h2 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
					<div className="card-actions justify-end">
						<Link className="btn" to={`/${pokemon.name}`}>
							More Info
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokeItem;
