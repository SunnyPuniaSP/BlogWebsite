/* eslint-disable react/prop-types */
import service from "../appwrite/config"
import { Link } from "react-router-dom"
import colors from "./Theme"
function Postcard({$id,title,featuredImage}){
    return(
        <Link to={`/post/${$id}`}>
            <div className={`${colors.cardBorderColor} ${colors.cardBgColor} mx-3 flex-col justify-between hover:scale-105 transform transition-transform duration-300 ease-in-out rounded-xl shadow hover:shadow-lg p-4 border`}>
                <div className="flex justify-center">
                    <img src={service.getFilePreview(featuredImage)} className=" w-full h-40 object-cover rounded-lg mb-4" alt="" />
                </div>
                <div className="flex justify-center my-2">
                    <h1 className={`font-semibold text-lg text-center  ${colors.cardTitleColor}`}>{title}</h1>
                </div>
            </div>
        </Link>
    )
}

export default Postcard