import { useNavigate, Link } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import { useAuthStore } from "../store/authStore";

export const SignupPage = () => {
    const navigate = useNavigate();
    const signup = useAuthStore((s) => s.signup);
    const loading = useAuthStore((s) => s.loading);

    const handleSignup = async (data: {
        name: string;
        email: string;
        password: string;
    }) => {
        try {
            await signup(data.name, data.email, data.password);
            navigate("/");
        } catch (err) {
            console.error("Signup failed", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Create Account ✨
                </h1>

                <SignupForm onSubmit={handleSignup} loading={loading} />

                <p className="text-sm text-gray-400 text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-400 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};
