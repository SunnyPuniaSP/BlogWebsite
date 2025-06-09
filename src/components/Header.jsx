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
            active:authstatus
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
            <div className={`flex justify-between px-2 py-2 mb-2  w-full ${colors.barColor}`}>
                <div className="h-10 w-10"><Logo/></div>
                <div className="flex flex-wrap">
                {
                    navItems.map((item)=>{
                        if(item.active){
                            return (<Button key={item.name} onClick={()=>navigate(item.slug)} className={`mr-5 rounded-lg px-2 py-2`} bgColor={colors.btnBgColor} textColor={colors.btnTextColor} >{item.name}</Button>)
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