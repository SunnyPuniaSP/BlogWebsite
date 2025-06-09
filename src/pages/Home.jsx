import { useSelector } from "react-redux"
import AllPosts from "./AllPosts";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import loginimg from "../assets/loginpageimg.png";
function Home(){
    const user=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();
    if(user)return(
        <AllPosts/>
    )
    else return(
        <div className="flex flex-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-col items-center justify-center gap-7">
            <div className={`  bg-cover w-[500px] h-[300px] rounded-lg`} style={{ backgroundImage: `url(${loginimg})` }}>
            </div> 
            <div className="flex gap-5">
                <Button className="px-5 py-3 min-w-[200px] rounded-xl" onClick={()=>{navigate("/login")}} bgColor="bg-black">Login</Button>
                <Button className="px-5 py-3 min-w-[200px] rounded-xl" onClick={()=>{navigate("/signup")}} bgColor="bg-black">SignUp</Button>
            </div>
        </div>
    )
}

export default Home