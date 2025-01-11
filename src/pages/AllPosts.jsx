import service from "../appwrite/config"
import { useState,useEffect } from "react"
import Postcard from "../components/Postcard"
function AllPosts(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        service.getPosts().then((posts)=>{if(posts)setPosts(posts.documents)})
    },[])
    return(
        <div className="flex flex-wrap my-2 min-h-screen w-full">
            {posts.map((post)=>{
                return (
                    <div className="w-1/4 my-2" key={post.$id}>
                    <Postcard {...post}/>
                </div>
                )
            })}
        </div>
    )
}

export default AllPosts