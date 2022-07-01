import React from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const Home = () => {
	return (
		<div>
			{/* Search bar componet here */}
			<SearchBar />
			{/* Search results component here */}
			<SearchResults />
		</div>
	);
};

export default Home;
