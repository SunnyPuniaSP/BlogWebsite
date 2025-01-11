/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState,useEffect } from "react"
function Protectedauth({children, status=true}){
    const [loader,setLoader]=useState(true);
    const navigate=useNavigate();
    const authstatus=useSelector((state)=>state.auth.status);
    useEffect(()=>{
        setLoader(true);
        if(authstatus===true && status===false){
            navigate('/')
        }
        else if(authstatus!=status ){
            navigate('/login')
        }
        setLoader(false);
    },[authstatus,navigate,status])
    return loader?<h3>LOADING...</h3>:<>{children}</>;
}

export default Protectedauth