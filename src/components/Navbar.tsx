import { useContext } from "react";
import { useNavigate } from "react-router";
import { BasketContext } from "../contexts/BasketContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
	const navigate = useNavigate();
	const basketContext = useContext(BasketContext);
	const { isAdmin, logout } = useContext(AuthContext);

	return (
		<div className="navbar bg-neutral min-h-20">
			<div className="hidden sm:block flex-1">
				<button
					type="button"
					className="btn btn-ghost text-5xl font-logo"
					onClick={() => navigate("/products")}
				>
					Bookle Up
				</button>
			</div>
			<label className="input input-bordered flex items-center gap-2 rounded-3xl h-10 mr-8">
				<input type="text" className="grow" placeholder="Search" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="w-4 h-4 opacity-70"
				>
					<title>Search Icon</title>
					<path
						fillRule="evenodd"
						d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</label>
			<div className="flex-none gap-4">
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
						<div className="indicator">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-7 w-7 scale-125"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<title>Indicator</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<span className="badge badge-sm indicator-item">
								{basketContext.basket.items.length}
							</span>
						</div>
					</div>
					<div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
						<div className="card-body">
							<span className="font-bold text-lg">
								{basketContext.basket.items.length}{" "}
								{basketContext.basket.items.length === 1 ? "Item" : "Items"}
							</span>
							<span className="text-info">
								Subtotal: ${basketContext.basket.totalCost}
							</span>
							<div className="card-actions">
								<button
									type="button"
									disabled={isAdmin}
									className="btn btn-secondary btn-block"
									onClick={() => navigate("/basket")}
								>
									View cart
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img className="scale-75" alt="Profile" src="profile.svg" />
						</div>
					</div>
					<ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<button type="button" className="justify-between">
								Profile
								<span className="badge">New</span>
							</button>
						</li>
						<li>
							<button type="button">Settings</button>
						</li>
						<li>
							<button onClick={() => logout()} type="button">
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
