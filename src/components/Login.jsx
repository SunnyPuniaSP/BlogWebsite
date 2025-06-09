import { Logo, Button, Input } from './index';
import authService from '../appwrite/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../store/authSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const loginacc = async (data) => {
        setError("");
        try {
            const session = await authService.login({ ...data });
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12">
                        <Logo />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">Sign In to Your Account</h2>
                <p className="text-center text-sm text-gray-500 mb-5">
                    Don't have an account?
                    <Link to="/signup" className="ml-1 text-blue-600 font-medium hover:underline">Sign Up</Link>
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(loginacc)} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full outline-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                        {...register("email", { required: true })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full outline-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                        {...register("password", { required: true })}
                    />

                    <div className="flex justify-center">
                        <Button type="submit" bgColor='bg-black' textColor='text-white' className="w-full py-2 rounded-xl  hover:bg-gray-800  font-semibold">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
