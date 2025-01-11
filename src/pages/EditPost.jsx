import Postform from "../components/Postform"
import { useState,useEffect } from "react"
// import {  useNavigate } from "react-router-dom"
import service from "../appwrite/config"
import { useParams } from "react-router-dom"
function EditPost(){
    const [post,setPost]=useState();
    const {slug}=useParams();
    // const navigate=useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post)setPost(post);
            })
        }
    },[slug])
    return (
        <div>
            <Postform post={post} />
        </div>
    )
}

export default EditPost