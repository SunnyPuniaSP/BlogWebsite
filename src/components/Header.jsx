import { useSelector } from "react-redux"
import {Button, Logo,LogoutBtn} from './index'
import { useNavigate } from "react-router-dom";
import colors from "./Theme"
function Header(){
    const authstatus=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();
    const navItems=[
        {
            name:"Home",
            slug:"/",
            active:authstatus,
            bgcolor:"bg-blue-600",
            textcolor:"text-white",
            hover:"hover:bg-blue-700"
        },
        {
            name:"Add-Post",
            slug:"/addpost",
            active:authstatus,
            bgcolor:"bg-gray-200",
            textcolor:"text-gray-800",
            hover:"hover:bg-gray-300"
        }
    ]
    return (
        <>
            <div className={`flex sticky top-0 z-50 shadow-md justify-between px-6 py-4  w-full ${colors.barColor}`}>
                <div className="h-10 w-10"><Logo/></div>
                <div className="flex flex-wrap">
                {
                    navItems.map((item)=>{
                        if(item.active){
                            return (<Button key={item.name} onClick={()=>navigate(item.slug)} className={`mr-5 px-4 py-2 rounded-md font-medium transition  ${item.hover}`} bgColor={item.bgcolor} textColor={item.textcolor} >{item.name}</Button>)
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