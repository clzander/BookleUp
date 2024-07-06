import { create } from "zustand";
import type { Book } from "../utils/interfaces";
import { getBook } from "../utils/api";

interface AuthPayloadType {
	email: string;
	password: string;
}

interface AuthResponseType {
	accessToken: string;
	user: {
		email: string;
		password: string;
		id: number;
		role: string;
	};
}

interface BasketItem {
	book: Book;
	quantity: number;
}

interface ReducedBasketItem {
	id: string;
	quantity: number;
}

interface StoreState {
	authenticated: boolean;
	isAdmin: boolean;
	error: Error | null;
	email: string;
	login: (email: string, password: string) => void;
	logout: () => void;

	basket: BasketItem[];
	addToBasket: (item: Book) => void;
	removeFromBasket: (id: string) => void;
	calculateTotalCost: () => number;
	clearBasket: () => void;
	loadBasket: () => void;
	saveBasket: () => void;
}

export const useStore = create<StoreState>()((set, get) => ({
	authenticated: false,
	isAdmin: false,
	error: null,
	email: "",
	login: async (email, password) => {
		const payload: AuthPayloadType = {
			email: email,
			password: password,
		};

		fetch("http://127.0.0.1:4730/login", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then((response) => {
				if (response.ok) {
					return response.json() as Promise<AuthResponseType>;
				}
				throw new Error("Incorrect username or password. Please try again.");
			})
			.then((data) => {
				set({ authenticated: true });
				set({ isAdmin: data.user.role === "admin" });
				set({ error: null });
				set({ email: email });
				get().loadBasket();
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation [LOGIN]:",
					error,
				);
				set({ error: error });
			});
	},
	logout: () => {
		get().saveBasket();
		get().clearBasket();
		set({ authenticated: false });
		set({ isAdmin: false });
		set({ email: "" });
	},

	basket: [],
	addToBasket: (newBook) => {
		const alreadyInBasket = get().basket.find(
			(itemInBasket) => itemInBasket.book.isbn === newBook.isbn,
		);
		if (alreadyInBasket) {
			alreadyInBasket.quantity += 1;
			set((state) => ({ basket: [...state.basket] }));
		} else {
			const newBasketItem = {
				book: newBook,
				quantity: 1,
			};
			set((state) => ({ basket: [...state.basket, newBasketItem] }));
		}
	},
	removeFromBasket: (isbn) =>
		set((state) => ({
			basket: state.basket.filter(
				(basketItem) => basketItem.book.isbn !== isbn,
			),
		})),
	calculateTotalCost: () => {
		const total = get().basket.reduce((total, item) => {
			const price = Number.parseFloat(item.book.price.replace("$", ""));
			return total + price * item.quantity;
		}, 0);
		console.log(total);
		return total;
	},
	clearBasket: () => set({ basket: [] }),
	loadBasket: async () => {
		if (get().authenticated) {
			const storedBasket: ReducedBasketItem[] = JSON.parse(
				localStorage.getItem(`basket-${get().email}`) || "[]",
			);

			console.log(storedBasket);

			const reconstructedBasket: BasketItem[] = [];
			for (const item of storedBasket) {
				const book = await getBook(item.id);
				if (book) {
					reconstructedBasket.push({
						book: book,
						quantity: item.quantity,
					});
				}
			}

			set({ basket: reconstructedBasket });
		}
	},
	saveBasket: () => {
		if (get().authenticated) {
			const basket = get().basket.map((item) => ({
				id: item.book.id,
				quantity: item.quantity,
			}));
			localStorage.setItem(`basket-${get().email}`, JSON.stringify(basket));
		}
	},
}));
