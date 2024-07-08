import { type FormEvent, useState } from "react";
import {
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from "react-router";
import type { Book } from "../utils/interfaces";
import { getBook, putBook } from "../utils/api";

export const EditBookPageLoader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id;
	if (id) {
		return await getBook(id);
	}
	return null;
};

export default function EditBookPage() {
	const book: Book = useLoaderData() as Book;
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>(book.title);
	const [subtitle, setSubtitle] = useState<string>(book.subtitle);
	const [isbn, setIsbn] = useState<string>(book.isbn);
	const [abstract, setAbstract] = useState<string>(book.abstract);
	const [numPages, setNumPages] = useState<number>(book.numPages);
	const [author, setAuthor] = useState<string>(book.author);
	const [publisher, setPublisher] = useState<string>(book.publisher);
	const [price, setPrice] = useState<string>(book.price);

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const payload = {
			title: title,
			subtitle: subtitle,
			isbn: isbn,
			abstract: abstract,
			numPages: numPages,
			author: author,
			publisher: publisher,
			price: price,
			cover: book.cover,
		};

		const response = await putBook(book.id, payload);
		navigate(`/products/${response?.id}`);
	}

	return (
		<div className="overflow-auto flex-grow">
			<div className="w-1/3 mx-auto my-8 bg-accent p-8 rounded-lg">
				<h1 className="text-2xl font-bold mb-4">Edit Book</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<label className="text-xl flex flex-row justify-between items-center">
						Title
						<input
							required
							type="text"
							placeholder="Title"
							className="input input-bordered w-full max-w-xs"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>

					<label className="text-xl flex flex-row justify-between items-center">
						Subtitle
						<input
							required
							type="text"
							placeholder="Subtitle"
							className="input input-bordered w-full max-w-xs"
							value={subtitle}
							onChange={(e) => setSubtitle(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						ISBN
						<input
							required
							type="text"
							placeholder="ISBN"
							className="input input-bordered w-full max-w-xs"
							value={isbn}
							onChange={(e) => setIsbn(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						Abstract
						<textarea
							required
							placeholder="Abstract"
							className="input input-bordered textarea w-full max-w-xs h-24 text-base"
							value={abstract}
							onChange={(e) => setAbstract(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						Author
						<input
							required
							type="text"
							placeholder="Author"
							className="input input-bordered w-full max-w-xs"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						Publisher
						<input
							required
							type="text"
							placeholder="Publisher"
							className="input input-bordered w-full max-w-xs"
							value={publisher}
							onChange={(e) => setPublisher(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						Price
						<input
							required
							type="text"
							placeholder="Price"
							className="input input-bordered w-full max-w-xs"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						Number of pages
						<input
							required
							type="number"
							placeholder="Number of pages"
							className="input input-bordered w-full max-w-xs"
							value={numPages}
							onChange={(e) => setNumPages(Number.parseInt(e.target.value))}
						/>
					</label>

					<div className="flex flex-row justify-end gap-4 mt-4">
						<button type="submit" className="btn">
							Save
						</button>
						<button
							type="button"
							className="btn"
							onClick={() => navigate(`/products/${book.id}`)}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
