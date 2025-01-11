import { useSelector } from "react-redux"
import AllPosts from "./AllPosts";
function Home(){
    const user=useSelector((state)=>state.auth.status);
    if(user)return(
        <AllPosts/>
    )
    else return(
        <div className="h-screen w-full flex justify-center">
            <h1>PLEASE SIGN-UP/LOGIN TO VIEW OR UPLOAD BLOGS</h1>
        </div>
    )
}

export default Home