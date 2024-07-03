import { type ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface RequireLoginProps {
	children: ReactNode
}

export default function RequireLogin({ children }: RequireLoginProps) {
	const { authed } = useContext(AuthContext);
	const location = useLocation();

	return authed === true ? (
		children
	) : (
		<Navigate to="/login" replace state={{ path: location.pathname }} />
	);
}