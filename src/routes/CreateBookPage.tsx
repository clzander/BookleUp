import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { postBook } from "../utils/api";

export default function CreateBookPage() {
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>("");
	const [subtitle, setSubstitle] = useState<string>("");
	const [isbn, setIsbn] = useState<string>("");
	const [abstract, setAbstract] = useState<string>("");
	const [numPages, setNumPages] = useState<number>(1);
	const [author, setAuthor] = useState<string>("");
	const [publisher, setPublisher] = useState<string>("");
	const [price, setPrice] = useState<number>();
	const [cover, setCover] = useState<string>("");

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
			price: `$${price}`,
			cover: cover,
		};

		const response = await postBook(payload);
		navigate(`/products/${response?.id}`);
	}

	return (
		<div className="overflow-auto flex-grow">
			<div className="w-1/3 mx-auto my-8 bg-accent p-8 rounded-lg">
				<h1 className="text-2xl font-bold mb-4">Create Book</h1>
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
							onChange={(e) => setSubstitle(e.target.value)}
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
							type="number"
							placeholder="Price"
							className="input input-bordered w-full max-w-xs"
							value={price}
							onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
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
					<label className="text-xl flex flex-row justify-between items-center">
						Cover
						<input
							type="text"
							placeholder="Cover"
							className="input input-bordered w-full max-w-xs"
							value={cover}
							onChange={(e) => setCover(e.target.value)}
						/>
					</label>

					<div className="flex flex-row justify-end gap-4 mt-4">
						<button type="submit" className="btn">
							Save
						</button>
						<button
							type="button"
							className="btn"
							onClick={() => navigate("/products")}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
