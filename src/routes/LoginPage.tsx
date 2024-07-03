import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
	const { authed, login, error } = useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	useEffect(() => {
		authed ? navigate("/products") : navigate("/login");
	}, [authed, navigate]);

	async function onLoginClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) {
		e.preventDefault();
		login(email, password);
	}

	return (
		<div className="flex flex-col justify-center h-screen overflow-hidden bg-base-100">
			<div className="w-1/3 m-auto">
				{error && (
					<div role="alert" className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<title>Alert Icon</title>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{error.message}</span>
					</div>
				)}
				<div className="w-full p-6 mt-16 bg-neutral rounded-md shadow-md ring-2 ring-gray-800/50">
					<h1 className="text-3xl font-bold text-center">Login</h1>
					<form className="space-y-4">
						<div>
							<label className="label">
								<span className="text-base label-text">Email</span>
							</label>
							<input
								type="text"
								required
								placeholder="Email Address"
								className="w-full input input-bordered"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label className="label">
								<span className="text-base label-text">Password</span>
							</label>
							<input
								type="password"
								required
								placeholder="Enter Password"
								className="w-full input input-bordered"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<p className="text-xs hover:underline hover:text-blue-600">
							Forget Password?
						</p>
						<div>
							<button
								type="button"
								onClick={(e) => onLoginClick(e)}
								className="btn btn-block bg-base-200"
							>
								Login
							</button>
						</div>
						<p className="text-xs hover:underline hover:cursor-pointer hover:text-blue-600">
							Don't have an account yet? Sign up!
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
