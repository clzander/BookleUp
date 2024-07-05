import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useStore } from "../domain/store";

export default function RootPage() {
	const authenticated = useStore(state => state.authenticated);
	const navigate = useNavigate();

	useEffect(() => {
		authenticated ? navigate("/products") : navigate("/login");
	}, [authenticated, navigate]);

	return (
		<div className="h-screen flex flex-col">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
}
