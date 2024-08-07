import {
	useLoaderData,
	useNavigate,
	type LoaderFunctionArgs,
} from "react-router";
import type { Book } from "../utils/interfaces";
import { useStore } from "../domain/store";
import { getBook } from "../utils/api";

export const BookDetailsPageLoader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id;
	if (id) {
		return await getBook(id);
	}
	return null;
};

export function BookDetailsPage() {
	const book = useLoaderData() as Book;
	const navigate = useNavigate();
	const isAdmin = useStore((state) => state.isAdmin);
	const addToBasket = useStore((state) => state.addToBasket);

	return (
		<div className="flex-grow overflow-auto m-8 w-2/3 mx-auto">
			<button
				className="btn mb-8"
				type="button"
				onClick={() => navigate("/products")}
			>
				<img alt="left arrow" src="../public/left-arrow.svg" className="w-6" />
				Back
			</button>
			<div className="bg-accent shadow-lg rounded-lg flex-row flex items-center">
				{book.cover && (
					<figure className="w-1/3 h-full overflow-visible">
						<img
							className="flex justify-center items-center w-full h-full"
							src={book.cover}
							alt={book.title}
						/>
					</figure>
				)}
				{!book.cover && (
					<p className="w-1/3 h-full m-auto text-center">No Image</p>
				)}
				<div className="mt-8 p-6 w-full">
					<h2 className="text-3xl font-bold mb-2">{book.title}</h2>
					<h3 className="text-2xl font-semibold text-gray-800 mb-8">
						{book.subtitle}
					</h3>
					<p className="text-xl mt-2 text-gray-800">
						<strong>ISBN:</strong> {book.isbn}
					</p>
					<p className="text-xl mt-2 text-gray-800">
						<strong>Abstract:</strong> {book.abstract}
					</p>
					<p className="text-xl mt-2 text-gray-800">
						<strong>Number of Pages:</strong> {book.numPages}
					</p>
					<p className="text-xl mt-2 text-gray-800">
						<strong>Author:</strong> {book.author}
					</p>
					<p className="text-xl mt-2 text-gray-800">
						<strong>Publisher:</strong> {book.publisher}
					</p>
					<p className="text-xl mt-2 text-gray-800">
						<strong>Price:</strong> {book.price}
					</p>

					<div className="flex flex-row gap-4 m-8 justify-end">
						{isAdmin && (
							<div className="flex gap-2">
								<button
									type="button"
									className="btn btn-neutral"
									onClick={() => navigate("edit")}
								>
									Edit
								</button>
								<button
									type="button"
									className="btn btn-error mr-8"
									onClick={() => navigate("delete")}
								>
									Delete
								</button>
							</div>
						)}
						<button
							type="button"
							className="btn"
							disabled={isAdmin}
							onClick={() => addToBasket(book)}
						>
							Buy
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
