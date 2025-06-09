import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import { useNavigate } from "react-router-dom";


function LogoutBtn(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    async function logouthandler(){
        await authService.logout().then(dispatch(logout()));
        navigate("/");
    }
    return (
        <button onClick={logouthandler} className="bg-red-500 hover:bg-red-600  text-white px-4 py-2 rounded-md font-medium transition shadow-sm">Logout</button>
    )
}

export default LogoutBtn