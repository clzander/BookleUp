import { useState, useEffect, useCallback } from "react";
import type { Book, FetchState } from "../utils/interfaces";

interface UseBooksResult {
	books: Book[];
	state: FetchState;
	error: Error | null;
	refresh: () => void;
	nextPage: () => void;
	previousPage: () => void;
	lastPage: () => void;
	firstPage: () => void;
	currentPageNum: number;
	deleteBook: (id: string) => void;
}

let currentPageNum = 1;
let lastPageNum = 1;

const useBooks = (): UseBooksResult => {
	const [books, setBooks] = useState<Book[]>([]);

	const [state, setState] = useState<FetchState>("initial");
	const [error, setError] = useState<Error | null>(null);

	function getPageNumberFromUrl(url: string): number {
		const urlObj = new URL(url);
		const params = new URLSearchParams(urlObj.search);
		const pageNumber = params.get("_page");
		if (pageNumber) {
			return Number.parseInt(pageNumber, 10);
		}
		return 1;
	}

	function parseLinkHeader(header: string): string {
		let lastLink = "";
		if (header) {
			const parts = header.split(",");
			for (const part of parts) {
				const section = part.split(";");
				const url = section[0].replace(/<(.*)>/, "$1").trim();
				const name = section[1].replace(/rel="(.*)"/, "$1").trim();
				if (name === "last") {
					lastLink = url;
				}
			}
		}
		return lastLink;
	}

	const fetchBooks = useCallback(
		async (page: number) => {
			setState("loading");
			setError(null);

			try {
				const response = await fetch(
					`http://localhost:4730/books?_page=${page}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch books");
				}
				const data = (await response.json()) as Book[];
				setBooks(data);
				setState("success");
				const linkHeader = response.headers.get("Link");
				if (linkHeader) {
					const lastLink = parseLinkHeader(linkHeader);
					lastPageNum = getPageNumberFromUrl(lastLink);
				}
			} catch (err) {
				setError(err as Error);
				setState("error");
			}
		},
		[parseLinkHeader, getPageNumberFromUrl],
	);

	useEffect(() => {
		refresh();
	}, []);

	function refresh() {
		fetchBooks(currentPageNum);
	}

	function previousPage() {
		if (currentPageNum > 1) {
			currentPageNum = currentPageNum - 1;
		}
		fetchBooks(currentPageNum);
	}

	function nextPage() {
		if (currentPageNum < lastPageNum) {
			currentPageNum = currentPageNum + 1;
		}
		fetchBooks(currentPageNum);
	}

	function lastPage() {
		currentPageNum = lastPageNum;
		fetchBooks(currentPageNum);
	}

	function firstPage() {
		currentPageNum = 1;
		fetchBooks(currentPageNum);
	}

	async function deleteBook(id: string) {
		await fetch(`http://127.0.0.1:4730/books/${id}`, {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Couldn't delete book");
			})
			.then((data) => {
				return data;
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation [DELETE BOOK]:",
					error,
				);
			});
		refresh();
	}

	return {
		books,
		state,
		error,
		refresh,
		nextPage,
		previousPage,
		firstPage,
		lastPage,
		deleteBook,
		currentPageNum,
	};
};

export default useBooks;
