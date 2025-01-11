// import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
// import Home from './components/Home'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import {login,logout} from './store/authSlice'

function App() {
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData)dispatch(login(userData));
      else dispatch(logout());
    })
    .finally(()=> setLoading(false))
  },[dispatch])
  
  // const flag=useSelector((state)=>state.auth.status);
  if(loading){
    return <h3>Loading...</h3>
  }
  // else if(flag==false){
  //   return <h3>Login First</h3>
  // }
  return (
    <>
      <Layout/>
    </>
  )
}

export default App
