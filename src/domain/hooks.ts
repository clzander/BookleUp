import { useState, useEffect, useCallback } from "react";
import type { Book } from "../utils/interfaces";

type FetchState = "initial" | "loading" | "success" | "error";

interface UseBooksResult {
	books: Book[];
	state: FetchState;
	error: Error | null;
	refresh: () => void;
}

const useBooks = (): UseBooksResult => {
	const [books, setBooks] = useState<Book[]>([]);
	const [state, setState] = useState<FetchState>("initial");
	const [error, setError] = useState<Error | null>(null);

	const fetchBooks = useCallback(async () => {
		setState("loading");
		setError(null);

		try {
			const response = await fetch("http://127.0.0.1:4730/books");
			if (!response.ok) {
				throw new Error("Failed to fetch books");
			}
			const data = await response.json() as Book[];
			setBooks(data);
			setState("success");
		} catch (err) {
			setError(err as Error);
			setState("error");
		}
	}, []);

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	const refresh = () => {
		fetchBooks();
	};

	return {
		books,
		state,
		error,
		refresh,
	};
};

export default useBooks;
