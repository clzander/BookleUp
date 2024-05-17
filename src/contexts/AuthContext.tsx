import { ReactNode, createContext, useState } from "react"

interface AuthContextType {
    authed: boolean;
    isAdmin: boolean;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    authed: false,
    isAdmin: false,
    register: () => { },
    login: () => { },
});

interface AuthContextProviderProps {
    children: ReactNode;
};

interface AuthPayloadType {
    email: string;
    password: string;
};

interface AuthResponseType {
    accessToken: string;
    user: {
        email: string;
        password: string;
        id: number;
    };
};

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [authed, setAuthed] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    async function register(email: string, password: string) {

        const payload: AuthPayloadType = {
            email: email,
            password: password,
        }

        fetch("http://127.0.0.1:4730/register", {
            method: 'POST',
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<AuthResponseType>
            }
            throw new Error("Network response was not ok!")
        })
        .then(data => {
            setAuthed(true);
            setIsAdmin(data.user.id === 1);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation [REGISTER]:', error);
          });
    };

    async function login(email: string, password: string) {

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
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<AuthResponseType>
            }
            throw new Error("Network response was not ok!")
        })
        .then(data => {
            setAuthed(true);
            setIsAdmin(data.user.id === 1);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation [LOGIN]:', error);
        });
    };

    return (
        <AuthContext.Provider value={{
            authed,
            isAdmin,
            register,
            login,
        }}>
            {children}
        </AuthContext.Provider>
    );
};