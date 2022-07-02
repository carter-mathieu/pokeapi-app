import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
			<ToastContainer />
		</>
	);
}

export default App;
