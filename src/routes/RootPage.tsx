import Navbar from "../components/Navbar";
import { Outlet } from "react-router";


export default function RootPage() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
        
    )
}