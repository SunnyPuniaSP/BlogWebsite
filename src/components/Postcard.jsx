/* eslint-disable react/prop-types */
import service from "../appwrite/config"
import { Link } from "react-router-dom"
function Postcard({$id,title,featuredImage}){
    return(
        <Link to={`/post/${$id}`}>
            <div className="border-4 p-4 border-pink-400 rounded-xl bg-blue-100 mx-2 flex-col justify-between">
                <div className="flex justify-center">
                    <img src={service.getFilePreview(featuredImage)} className="rounded-xl max-w-72 max-h-28" alt="" />
                </div>
                <div className="flex justify-center my-2">
                    <h1 className="text-2xl bold ">{title}</h1>
                </div>
            </div>
        </Link>
    )
}

export default Postcard