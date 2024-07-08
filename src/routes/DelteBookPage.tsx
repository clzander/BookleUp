import {
	useLoaderData,
	useNavigate,
	type LoaderFunctionArgs,
} from "react-router";
import useBooks from "../domain/hooks";
import type { Book } from "../utils/interfaces";
import { getBook } from "../utils/api";

export const DeleteBookPageLoader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id;
	if (id) {
		return await getBook(id);
	}
	return null;
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
