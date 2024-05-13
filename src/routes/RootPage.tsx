import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootPage() {
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