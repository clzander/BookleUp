import { useNavigate } from "react-router"

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center text-center">
            <button type="button" className="btn btn-ghost text-5xl font-logo my-16" onClick={() => navigate("/products")}>Bookle Up</button>
            <h1 className="text-2xl font-bold">Error</h1>
            <p>We couldn't find the page you were looking for</p>
            <button type="button" className="btn" onClick={() => navigate("/products")}>Back to the home page</button>
        </div>
    )
}