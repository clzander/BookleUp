import { useNavigate, useRouteError } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ErrorPage() {
	const navigate = useNavigate();
	const error = useRouteError();

	return (
		<div className="h-screen flex flex-col">
			<Navbar />
			<div className="flex flex-col justify-center text-center flex-grow">
				<h1 className="text-2xl font-bold">Oops!</h1>
				<p>Sorry, we couldn't find that page you were looking for.</p>
				<p>{error.statusText || error.message}</p>
			</div>
			<Footer />
		</div>
	);
}
