import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootPage from './routes/RootPage'
import ErrorPage from './routes/ErrorPage'
import './index.css'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'
import BasketPage from './routes/BasketPage'
import { Provider } from 'react-redux'
import store from './app/store'
import ProductsPage from './routes/ProductsPage'
import BasketContextProvider from './contexts/BasketContext'

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/basket",
				element: <BasketPage />
			},
			{
				path: "/products",
				element: <ProductsPage />
			}
		]
	},
	{
		path: "/login",
		element: <LoginPage />
	},
	{
		path: "/signup",
		element: <SignUpPage />
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BasketContextProvider>
				<RouterProvider router={router} />
			</BasketContextProvider>
		</Provider>
	</React.StrictMode>,
)
