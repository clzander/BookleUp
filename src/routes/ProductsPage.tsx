import { useEffect } from "react";
//import BookList from "../app/features/books/BookList";
import useBooks from "../domain/hooks";
import Book from "../components/Book";

export default function ProductsPage() {
	const { books, state, error, currentPage, refresh, nextPage, previousPage } =
		useBooks();

	useEffect(() => {
		const interval = setInterval(() => {
			refresh();
		}, 60000); // 60 seconds

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [refresh]);

	return (
		<div className="overflow-auto flex-grow">
			<div>
				{state === "loading" && <p>Loading books….</p>}
				{state === "error" && <p>Error: {error?.message}</p>}
				{state === "success" && (
					<div className="grid grid-cols-2 gap-x-8 gap-y-8 m-8">
						{books.map((book) => (
							<Book key={book.isbn} book={book} />
						))}
					</div>
				)}
			</div>
			<div className="join justify-center w-full mb-8">
				<button
					type="button"
					className="join-item btn"
					onClick={() => previousPage()}
				>
					«
				</button>
				<button type="button" className="join-item btn">
					Page {currentPage}
				</button>
				<button
					type="button"
					className="join-item btn"
					onClick={() => nextPage()}
				>
					»
				</button>
			</div>
		</div>
	);
}
