import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"



function LogoutBtn(){
    const dispatch=useDispatch();
    function logouthandler(){
        authService.logout().then(dispatch(logout()))
    }
    return (
        <button onClick={logouthandler} className="bg-red-400 rounded-lg px-2 py-2">Logout</button>
    )
}

export default LogoutBtn