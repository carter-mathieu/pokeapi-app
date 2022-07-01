import React from "react";
import { Link } from "react-router-dom";

interface PokeItemInterface {
	key: string;
	pokemon: { name: string; url: string };
}

const PokeItem = ({ pokemon }: PokeItemInterface) => {
	return <Link to={`/${pokemon.name}`}>{pokemon.name}</Link>;
};

export default PokeItem;
