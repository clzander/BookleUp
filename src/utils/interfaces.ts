export interface Book {
	title: string;
	subtitle: string;
	isbn: string;
	abstract: string;
	numPages: number;
	author: string;
	publisher: string;
	price: string;
	cover: string;
}

export interface BasketItem {
	item: Book;
	quantity: number;
	itemPrice: number;
}

export interface Basket {
	totalCost: number;
	items: BasketItem[];
}

export type FetchState = "initial" | "loading" | "success" | "error";
