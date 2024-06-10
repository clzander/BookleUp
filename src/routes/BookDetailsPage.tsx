import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Book } from "../utils/interfaces";

export const bookDetailsPageLoader = async ({ params }: LoaderFunctionArgs) => {
	const fetchURL: string = `http://127.0.0.1:4730/books/${params.isbn}`;

	const response = fetch(fetchURL, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json() as Promise<Book>;
			}
			throw new Error("Network response was not ok!");
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error("Fetching [GET BOOK] failed:\n", error);
			return [];
		});

	return response;
};

export default function BookDetailsPage() {
	const book = useLoaderData() as Book;

	return (
		<div className="flex-grow">
			<p>{book.author}</p>
		</div>
	);
}
