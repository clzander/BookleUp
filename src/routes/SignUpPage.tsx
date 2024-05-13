import { useNavigate } from "react-router"

export default function SignUpPage() {
    const navigate = useNavigate()

    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
                <h1 className="text-5xl text-center font-logo">Sign Up</h1>
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password"
                            className="w-full input input-bordered" />
                    </div>
                    <a href="" className="text-xs hover:underline hover:text-blue-600">Forget Password?</a>
                    <div>
                        <button className="btn btn-block bg-base-200">Sign Up</button>
                    </div>
                    <a onClick={() => navigate("/login")} className="text-xs hover:underline hover:cursor-pointer hover:text-blue-600">Already have an account? Login!</a>
                </form>
            </div>
        </div>
    )
}