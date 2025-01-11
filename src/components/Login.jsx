import {Logo,Button,Input} from './index'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
export const Login=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState("");
    const loginacc=async(data)=>{
        setError("");
        try {
            const session=await authService.login({...data});
            if(session){
                const userData=await authService.getCurrentUser();
                if(userData)dispatch(login(userData));
                navigate('/');
            }
            else{
                console.log("not created session===");
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return(
        <div className='h-screen w-full flex justify-center'>
            <div className='border-4  bg-green-200 h-72 px-5 py-5'>
                <div className='flex justify-center'>
                    <div className='w-10 h-10'>
                        <Logo/>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <h2 className='flex justify-center'>Sign In to your Account</h2>
                        <p>Do not have an Account. Please Sign UP
                        <Link to={"/signup"} className='mx-2 text-blue-600 font-bold' >Sign Up</Link></p>
                    </div>
                </div>
                <div className=''>{error && <p>There is an error for your Login: {error}</p>}</div>
                <div className=''>
                    <form onSubmit={handleSubmit(loginacc)}>
                        <Input label={"Email: "} type={"email"} placeholder="Enter Your Email" className="w-3/5" {...register("email",{
                            required:true,
                            // validate: {
                            //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            //     "Email address must be a valid address",
                            // }
                        })}/>
                        <Input label={"Password: "} type={"password"} placeholder="Enter Your Password" className="w-3/5" {...register("password",{
                            required:true
                        })}/>
                        <div className='flex justify-center my-4'><Button type='submit' className='py-2 px-2 w-40 rounded-2xl'>Login</Button></div>
                    </form>
                </div>

            </div>
        </div>
    )
}

