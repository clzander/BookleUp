import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../domain/store";

interface RequireLoginProps {
	children: ReactNode
}

export default function RequireAdmin({ children }: RequireLoginProps) {
	const isAdmin = useStore(state => state.isAdmin)
	const location = useLocation();

	return isAdmin === true ? (
		children
	) : (
		<Navigate to="/login" replace state={{ path: location.pathname }} />
	);
}