import { create } from "zustand";

interface BasketItem {
	id: string;
	name: string;
	quantity: number;
	price: number;
}

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

interface StoreState {
	authenticated: boolean;
	isAdmin: boolean;
	error: Error | null;
	email: string;
	login: (email: string, password: string) => void;
	logout: () => void;

	basket: BasketItem[];
	addToBasket: (item: BasketItem) => void;
	removeFromBasket: (id: string) => void;
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
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation [LOGIN]:",
					error,
				);
				set({ error: error });
			});
		get().loadBasket();
	},
	logout: () => {
		get().saveBasket();
		get().clearBasket();
		set({ authenticated: false });
		set({ isAdmin: false });
		set({ email: "" });
	},

	basket: [],
	addToBasket: (item) =>
		set((state) => ({
			basket: [...state.basket, item],
		})),
	removeFromBasket: (id) =>
		set((state) => ({
			basket: state.basket.filter((item) => item.id !== id),
		})),
	clearBasket: () => set({ basket: [] }),
	loadBasket: () => {
		if (get().authenticated) {
			const storedBasket = JSON.parse(
				localStorage.getItem(`basket-${get().email}`) || "[]",
			);
			set({ basket: storedBasket });
		}
	},
	saveBasket: () => {
		if (get().authenticated) {
			const basket = get().basket;
			localStorage.setItem(`basket-${get().email}`, JSON.stringify(basket));
		}
	}
}));
