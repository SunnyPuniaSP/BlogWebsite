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
        <div className="w-full py-8 px-4 ">
           <div className="mr-5 flex justify-center">
           {post.featuredImage && ( 
                <div className="border-4 p-2 border-blue-600 rounded-2xl max-w-screen-md ">
                    <img className="rounded-3xl max-h-96 max-w-screen-md" src={service.getFilePreview(post.featuredImage)} alt="Post Featured" />
                </div>
            )}
           </div>
            {auth && (
                <div className="absolute top-20 right-10">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button className="bg-green-500 rounded-xl py-2 px-2 mx-2 w-20">Edit</Button>
                    </Link>
                    <Button className="bg-red-500 rounded-xl py-2 px-2 mx-2 w-20" onClick={deletePost} >Delete</Button>
                </div>
            )}
            <div className="">
                <h1 className="text-2xl font-bold w-full flex justify-center mt-4">{post.title}</h1>
                {post.content && <p className="mt-4">{parse(post.content)}</p>}
            </div>
        </div>
    )
}

export default Post;