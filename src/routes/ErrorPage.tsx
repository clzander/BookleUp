import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ErrorPage() {

	return (
		<div className="h-screen flex flex-col">
			<Navbar />
			<div className="flex flex-col justify-center text-center flex-grow">
				<h1 className="text-2xl font-bold">Oops!</h1>
				<p>Sorry, we couldn't find that page you were looking for.</p>
				
			</div>
			<Footer />
		</div>
	);
}
