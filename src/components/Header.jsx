import { useSelector } from "react-redux"
import {Button, Logo,LogoutBtn} from './index'
import { useNavigate } from "react-router-dom";
function Header(){
    const authstatus=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();
    const navItems=[
        {
            name:"Home",
            slug:"/",
            active:true
        },
        {
            name:"Login",
            slug:"/login",
            active:!authstatus
        },
        {
            name:"Sign-Up",
            slug:"/signup",
            active:!authstatus
        },
        {
            name:"Add-Post",
            slug:"/addpost",
            active:authstatus
        }
    ]
    return (
        <>
            <div className="flex justify-between px-2 py-2 mb-2  w-full bg-gray-500">
                <div className="h-10 w-10"><Logo/></div>
                <div className="flex flex-wrap justify-between w-1/3">
                {
                    navItems.map((item)=>{
                        if(item.active){
                            return (<Button key={item.name} onClick={()=>navigate(item.slug)} className={`${item.name==="Login" || item.name==="Sign-Up"?"bg-green-400":"bg-yellow-400"} rounded-lg px-2 py-2`} textColor="text-black">{item.name}</Button>)
                        }
                    })
                }
                {
                    authstatus && (<LogoutBtn/>)
                }
                </div>
            </div>
        </>
    )
}

export default Header