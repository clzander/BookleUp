import { useEffect, useState } from "react";

export default function BasketPage() {
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoaded(true);
		}, 1500);
		// Clear the timer to prevent memory leaks
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className=" flex flex-grow justify-center items-center">
			{!loaded ? (
				<span className="loading loading-spinner loading-lg" />
			) : (
				<h1 className="text-2xl font-bold">Thank's for your order!</h1>
			)}
		</div>
	);
}
