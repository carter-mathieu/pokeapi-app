import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="navbar bg-primary text-primary-content mb-4">
			<Link className="btn btn-ghost normal-case text-xl" to="/">
				Pokedex
			</Link>
		</div>
	);
};

export default Navbar;
