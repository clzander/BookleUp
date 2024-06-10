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
import ProductsPage from "./routes/ProductsPage";
import BasketContextProvider from "./contexts/BasketContext";
import AuthContextProvider from "./contexts/AuthContext";
import AboutPage from "./routes/About";
import BookDetailsPage, {
	bookDetailsPageLoader,
} from "./routes/BookDetailsPage";

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
				element: <ProductsPage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/products/:isbn",
				loader: bookDetailsPageLoader,
				element: <BookDetailsPage />,
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
