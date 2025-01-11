import service from "../appwrite/config"
import { useState,useEffect } from "react"
import Postcard from "../components/Postcard"
function AllPosts(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        service.getPosts().then((posts)=>{if(posts)setPosts(posts.documents)})
    },[])
    return(
        <div className="flex flex-wrap h-screen w-full ml-2 my-2">
            {posts.map((post)=>{
                return (
                    <div className="w-1/4" key={post.$id}>
                    <Postcard {...post}/>
                </div>
                )
            })}
        </div>
    )
}

export default AllPosts