import { useSelector } from "react-redux"
import AllPosts from "./AllPosts";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import loginimg from "../assets/bloglanding.png";
function Home(){
    const user=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();
    if(user)return(
        <AllPosts/>
    )
    else return(
        <div className="flex flex-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-col items-center justify-center gap-7">
            <img src={loginimg} alt="" className="h-[500px] w-[800px] rounded-2xl" />
            
            <div className="flex gap-5">
                <Button className="px-5 py-3 min-w-[200px] rounded-xl hover:bg-gray-800 transition duration-300" onClick={()=>{navigate("/login")}} bgColor="bg-black" textColor="text-white">Login</Button>
                <Button className="px-5 py-3 min-w-[200px] rounded-xl hover:bg-gray-800 transition duration-300" onClick={()=>{navigate("/signup")}} bgColor="bg-black" textColor="text-white">SignUp</Button>
            </div>
        </div>
    )
}

export default Home