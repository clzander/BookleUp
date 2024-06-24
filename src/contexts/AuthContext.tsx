import { type ReactNode, createContext, useState } from "react";
import type { FetchState } from "../utils/interfaces";

interface AuthContextType {
	state: FetchState;
	error: Error | null;
	authed: boolean;
	isAdmin: boolean;
	token: string;
	login: (email: string, password: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	state: "initial",
	error: null,
	authed: false,
	isAdmin: false,
	token: "",
	login: () => {},
	logout: () => {},
});

interface AuthContextProviderProps {
	children: ReactNode;
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

export default function AuthContextProvider({
	children,
}: AuthContextProviderProps) {
	const [authed, setAuthed] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [state, setState] = useState<FetchState>("initial");
	const [error, setError] = useState<Error | null>(null);
	const [token, setToken] = useState<string>("");

	async function login(email: string, password: string) {
		setState("loading");
		setError(null);

		const payload: AuthPayloadType = {
			email: email,
			password: password,
		};

		fetch("http://127.0.0.1:4730/login", {
			method: "POST",
			mode: "cors", // no-cors, *cors, same-origin
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(payload),
		})
			.then((response) => {
				if (response.ok) {
					return response.json() as Promise<AuthResponseType>;
				}
				throw new Error("Email or Password were incorrect");
			})
			.then((data) => {
				setAuthed(true);
				setIsAdmin(data.user.id === 1);
				setToken(data.accessToken);
				setState("success");
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation [LOGIN]:",
					error,
				);
				setError(error);
				setState("error");
			});
	}

	async function logout() {
		setAuthed(false);
		setIsAdmin(false);
		setToken("");
	}

	return (
		<AuthContext.Provider
			value={{
				state,
				error,
				authed,
				isAdmin,
				token,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
