import { useEffect } from "react";
import useBooks from "../domain/hooks";
import Book from "../components/Book";
import { useNavigate } from "react-router";
import { useStore } from "../domain/store";

export default function BooksPage() {
	const {
		books,
		state,
		error,
		refresh,
		nextPage,
		previousPage,
		lastPage,
		firstPage,
		currentPageNum,
		deleteBook,
	} = useBooks();
	const navigate = useNavigate();
	const isAdmin = useStore((state) => state.isAdmin);

	useEffect(() => {
		const interval = setInterval(() => {
			refresh();
		}, 60000); // 60 seconds

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [refresh]);

	return (
		<div className="overflow-auto flex-grow">
			{isAdmin && (
				<div className="mt-8 mr-8 flex justify-end">
					<button
						type="button"
						onClick={() => navigate("create")}
						className="btn"
					>
						Create Book
					</button>
				</div>
			)}
			<div>
				{state === "loading" && <p>Loading books….</p>}
				{state === "error" && <p>Error: {error?.message}</p>}
				{state === "success" && (
					<div className="grid grid-cols-2 gap-x-8 gap-y-8 m-8">
						{books.map((book) => (
							<Book
								key={book.isbn}
								book={book}
								refresh={refresh}
								deleteBook={deleteBook}
							/>
						))}
					</div>
				)}
			</div>
			<div className="join justify-center w-full mb-8">
				<button
					type="button"
					className="join-item btn"
					onClick={() => firstPage()}
				>
					{"<<"}
				</button>
				<button
					type="button"
					className="join-item btn"
					onClick={() => previousPage()}
				>
					{"<"}
				</button>
				<button type="button" className="join-item btn" onClick={refresh}>
					Page {currentPageNum}
				</button>
				<button
					type="button"
					className="join-item btn"
					onClick={() => nextPage()}
				>
					{">"}
				</button>
				<button
					type="button"
					className="join-item btn"
					onClick={() => lastPage()}
				>
					{">>"}
				</button>
			</div>
		</div>
	);
}
