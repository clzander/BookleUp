import { useState, useEffect, useCallback } from "react";
import type { Book, FetchState } from "../utils/interfaces";

interface UseBooksResult {
	books: Book[];
	state: FetchState;
	error: Error | null;
	currentPage: number;
	refresh: () => void;
	nextPage: () => void;
	previousPage: () => void;
}

const useBooks = (): UseBooksResult => {
	const [books, setBooks] = useState<Book[]>([]);
	const [state, setState] = useState<FetchState>("initial");
	const [error, setError] = useState<Error | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchBooks = useCallback(async () => {
		setState("loading");
		setError(null);

		try {
			const response = await fetch(
				`http://127.0.0.1:4730/books?_page=${currentPage}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch books");
			}
			const data = (await response.json()) as Book[];
			setBooks(data);
			setState("success");
		} catch (err) {
			setError(err as Error);
			setState("error");
		}
	}, [currentPage]);

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	function refresh() {
		fetchBooks();
	}

	function previousPage() {
		setCurrentPage(currentPage - 1);
		//refresh()
	}

	function nextPage() {
		setCurrentPage(currentPage + 1);
		//refresh();
	}

	return {
		books,
		state,
		error,
		currentPage,
		refresh,
		nextPage,
		previousPage,
	};
};

export default useBooks;
