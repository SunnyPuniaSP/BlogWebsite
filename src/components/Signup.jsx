import {Logo, Input, Button} from './index'
import { login } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'

export const Signup=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error,setError]=useState("");
    const {register,handleSubmit}=useForm();

    const createacc=async(data)=>{
        setError("");
        try {
            const session=await authService.createAccount({...data});
            if(session){
                const userData=await authService.getCurrentUser();
                if(userData){
                    console.log(userData);
                    dispatch(login(userData));
                    navigate('/')
                }
                
            }
        } catch (error) {
            setError(error.message);
        }
    }


    return(
        <div className='h-screen w-full flex justify-center'>
            <div className='border-4  bg-green-200 h-80 px-5 py-5'>
                <div className='flex justify-center'>
                    <div className='w-10 h-10'>
                        <Logo/>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <h2 className='flex justify-center'>Create your Account</h2>
                        <p>If you have already Account <Link to={"/login"} className='text-blue-600 font-bold'>Login</Link></p>
                    </div>
                </div>
                <div>{error && <p>Error while creating your account: {error}</p>}</div>
                <div>
                    <form onSubmit={handleSubmit(createacc)}>
                        <Input label="Full Name:" type="text" placeholder="Full Name" className="w-3/5" {...register("name",{
                            required:true
                        })}/>
                        <Input label={"Email: "} type={"email"} placeholder="Enter Your Email" className="w-3/5" {...register("email",{
                            required:true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}/>
                        <Input label="Password" type="password" placeholder="Password" className="w-3/5" {...register("password",{
                            required:true
                        })}/>
                        <div className='flex justify-center my-4'><Button type='submit' className='py-2 px-2 w-40 rounded-2xl'>Create Account</Button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

