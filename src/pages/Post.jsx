import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../components";
import parse from 'html-react-parser'
function Post(){
    const [post,setPost]=useState({});
    const {slug}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post)setPost(post);
            })
        }
    },[slug])
    const userdata=useSelector((state)=>state.auth.userData);
    const auth=userdata?userdata.$id===post.userId:false;
    const deletePost=()=>{
        service.deletePost(post.$id).then((status)=>{
            if(status){
                service.deleteFile(post.featuredImage);
                navigate('/')
            }
        })
    }
    return(
        <div className="max-w-3xl mx-auto px-4 py-10 bg-gray-50 rounded-xl shadow-sm">
           <div className="mr-5 flex justify-center">
           {post.featuredImage && ( 
                 <img className="w-full rounded-xl border-2 border-blue-500 shadow-md mx-auto" src={service.getFilePreview(post.featuredImage)} alt="Post Featured" />
            )}
           </div>
            {auth && (
                <div className="absolute top-20 right-10">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" textColor="text-white" className=" rounded-xl py-2 px-2 mx-2 w-20 ">Edit</Button>
                    </Link>
                    <Button bgColor="bg-red-500" textColor="text-white" className=" rounded-xl py-2 px-2 mx-2 w-20" onClick={deletePost} >Delete</Button>
                </div>
            )}
            <div className="">
                <h1 className=" text-3xl font-bold text-gray-800 text-center mt-6">{post.title}</h1>
                {post.content && <p className="text-lg text-gray-700 mt-4 leading-relaxed text-justify">{parse(post.content)}</p>}
            </div>
        </div>
    )
}

export default Post;