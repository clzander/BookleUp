import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function RootPage() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        authContext.authed ? navigate("/products") : navigate("/login")
    }, [authContext.authed])

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
                 
                <Navbar />
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}