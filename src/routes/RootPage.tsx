import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
    //useContext, 
    useEffect } 
    from "react";
//import { AuthContext } from "../contexts/AuthContext";

export default function RootPage() {
    //const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/products")
        //authContext.authed ? navigate("/products") : navigate("/login")
    }, [
        //authContext,
        navigate])

    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}