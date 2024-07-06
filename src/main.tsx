import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./routes/RootPage";
import ErrorPage from "./routes/ErrorPage";
import "./index.css";
import LoginPage from "./routes/LoginPage";
import BasketPage from "./routes/BasketPage";
import OrderPage from "./routes/OrderPage";
import AboutPage from "./routes/About";
import {
	BookDetailsPage,
	BookDetailsPageLoader,
} from "./routes/BookDetailsPage";
import EditBookPage, { EditBookPageLoader } from "./routes/EditBookPage";
import BooksPage from "./routes/BooksPage";
import CreateBookPage from "./routes/CreateBookPage";
import DeleteBookPage, { DeleteBookPageLoader } from "./routes/DelteBookPage";
import RequireLogin from "./components/RequiresLogin";
import RequireAdmin from "./components/RequiresAdmin";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/basket",
				element: (
					<RequireLogin>
						<BasketPage />
					</RequireLogin>
				),
			},
			{
				path: "/products",
				element: (
					<RequireLogin>
						<BooksPage />
					</RequireLogin>
				),
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/products/:isbn",
				loader: BookDetailsPageLoader,
				element: (
					<RequireLogin>
						<BookDetailsPage />
					</RequireLogin>
				),
			},
			{
				path: "/products/:isbn/edit",
				loader: EditBookPageLoader,
				element: (
					<RequireAdmin>
						<EditBookPage />
					</RequireAdmin>
				),
			},
			{
				path: "/products/:isbn/delete",
				loader: DeleteBookPageLoader,
				element: (
					<RequireAdmin>
						<DeleteBookPage />
					</RequireAdmin>
				),
			},
			{
				path: "products/create",
				element: (
					<RequireAdmin>
						<CreateBookPage />
					</RequireAdmin>
				),
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/order",
				element: <OrderPage />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
} else {
	throw new Error("FATAL ERROR: Couldn't load application!");
}
