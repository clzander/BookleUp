import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../domain/store";

interface RequireLoginProps {
	children: ReactNode
}

export default function RequireLogin({ children }: RequireLoginProps) {
	const authenticated = useStore((state) => state.authenticated)
	const location = useLocation();

	return authenticated === true ? (
		children
	) : (
		<Navigate to="/login" replace state={{ path: location.pathname }} />
	);
}