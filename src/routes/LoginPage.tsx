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
		<div className="relative flex flex-col justify-center h-screen overflow-hidden bg-base-100">
			<div className="w-full p-6 m-auto mt-16 bg-neutral rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
				<h1 className="text-3xl font-bold text-center">Login</h1>
				<p className="font-bold text-error">{error?.message}</p>
				<form className="space-y-4">
					<div>
						<label className="label">
							<span className="text-base label-text">Email</span>
						</label>
						<input
							type="text"
							required
							placeholder="Email Address"
							className={`w-full input input-bordered ${error ? "input-error border-2" : ""}`}
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
							className={`w-full input input-bordered ${error ? "input-error border-2" : ""}`}
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
	);
}
