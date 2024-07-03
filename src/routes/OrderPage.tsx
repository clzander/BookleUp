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
		<div>
			{!loaded ? (
				<span className="loading loading-spinner loading-lg"/>
			) : (
				<p>Thank's for your order!</p>
			)}
		</div>
	);
}
