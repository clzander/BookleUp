import {
	useLoaderData,
	useNavigate,
	type LoaderFunctionArgs,
} from "react-router";
import useBooks from "../domain/hooks";
import type { Book } from "../utils/interfaces";

export const DeleteBookPageLoader = async ({ params }: LoaderFunctionArgs) => {
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

export default function DeleteBookPage() {
	const book = useLoaderData() as Book;
	const navigate = useNavigate();
	const { deleteBook } = useBooks();

	return (
		<div className="overflow-auto flex-grow">
			<div className="w-1/3 mx-auto m-8 bg-accent p-8 rounded-xl">
				<h1 className="font-bold text-2xl text-left mb-4">
					Do you really want to delete this book?
				</h1>
				<div className="flex flex-col gap-2 mb-8">
					<div className="flex flex-row justify-between items-center">
						<p className="text-xl font-bold">Title</p>
						<p className="text-xl">{book.title}</p>
					</div>
					<div className="flex flex-row justify-between items-center">
						<p className="text-xl font-bold">Author</p>
						<p className="text-xl">{book.author}</p>
					</div>
					<div className="flex flex-row justify-between items-center">
						<p className="text-xl font-bold">ISBN</p>
						<p className="text-xl">{book.isbn}</p>
					</div>
				</div>

				<div className="flex flex-row justify-end gap-4">
					<button
						className="btn btn-error"
						type="submit"
						onClick={() => {
							deleteBook(book.id);
							navigate("/products");
						}}
					>
						Delete
					</button>
					<button
						className="btn"
						type="submit"
						onClick={() => navigate("/products")}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
