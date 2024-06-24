import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./routes/RootPage";
import ErrorPage from "./routes/ErrorPage";
import "./index.css";
import LoginPage from "./routes/LoginPage";
import BasketPage from "./routes/BasketPage";
import OrderPage from "./routes/OrderPage";
import { Provider } from "react-redux";
import store from "./app/store";
import BasketContextProvider from "./contexts/BasketContext";
import AuthContextProvider from "./contexts/AuthContext";
import AboutPage from "./routes/About";
import {
	BookDetailsPage,
	BookDetailsPageLoader,
} from "./routes/BookDetailsPage";
import EditBookPage, { EditBookPageLoader } from "./routes/EditBookPage";
import BooksPage from "./routes/BooksPage";
import CreateBookPage from "./routes/CreateBookPage";
import DeleteBookPage, { DeleteBookPageLoader } from "./routes/DelteBookPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/basket",
				element: <BasketPage />,
			},
			{
				path: "/products",
				element: <BooksPage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/products/:isbn",
				loader: BookDetailsPageLoader,
				element: <BookDetailsPage />,
			},
			{
				path: "/products/:isbn/edit",
				loader: EditBookPageLoader,
				element: <EditBookPage />,
			},
			{
				path: "/products/:isbn/delete",
				loader: DeleteBookPageLoader,
				element: <DeleteBookPage />,
			},
			{
				path: "products/create",
				element: <CreateBookPage />,
			},
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/order",
		element: <OrderPage />,
	},
]);

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<Provider store={store}>
				<AuthContextProvider>
					<BasketContextProvider>
						<RouterProvider router={router} />
					</BasketContextProvider>
				</AuthContextProvider>
			</Provider>
		</React.StrictMode>,
	);
} else {
	throw new Error("FATAL ERROR: Couldn't load application!");
}
