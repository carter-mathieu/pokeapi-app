import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokeProfile from "./pages/PokeProfile";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					{/* Setup routes to go to pages */}
					<Route path="/" element={<Home />} />
					<Route path="/:pokemonName" element={<PokeProfile />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
