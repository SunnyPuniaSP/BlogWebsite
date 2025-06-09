import { Logo, Input, Button } from './index';
import { login } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const createacc = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount({ ...data });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12">
            <Logo />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">Create Your Account</h2>
        <p className="text-center text-sm text-gray-500 mb-5">
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit(createacc)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Full Name"
            className="w-full outline-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            {...register("name", { required: true })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Password"
            className="w-full outline-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            {...register("password", { required: true })}
          />

          <div className="flex justify-center">
            <Button type="submit" bgColor='bg-black' textColor='text-white' className="w-full py-2 rounded-xl  hover:bg-gray-800  font-semibold">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
