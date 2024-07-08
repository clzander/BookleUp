import type { Book } from "./interfaces";

function sendFetch<ResponseType>(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	errMsg: string,
	payload?: object,
) {
	const requestOptions: RequestInit = {
		method,
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		...(method !== "GET" && payload ? { body: JSON.stringify(payload) } : {}),
	};

	const response = fetch(url, requestOptions)
		.then((response) => {
			if (response.ok) {
				return response.json() as Promise<ResponseType>;
			}
			throw new Error("Network response was not 'ok'");
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(errMsg, error);
		});
	return response;
}

export function getBook(bookId: string) {
	return sendFetch<Book>(
		`http://127.0.0.1:4730/books/${bookId}`,
		"GET",
		"Fetching [GET BOOK] failed:\n",
		undefined,
	);
}

export function postBook(newBook: Omit<Book, "id">) {
	return sendFetch<Book>(
		"http://127.0.0.1:4730/books",
		"POST",
		"Fetching [POST BOOK] failed:\n",
		newBook,
	);
}

export function putBook(bookId: string, editedBook: Omit<Book, "id">) {
	return sendFetch<Book>(
		`http://127.0.0.1:4730/books/${bookId}`,
		"PUT",
		"Fetching [POST BOOK] failed:\n",
		editedBook,
	);
}
