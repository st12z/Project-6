import { useNavigate } from "react-router";
import { deleteAllCookies } from "../../helper/cookie";
import {useDispatch} from "react-redux";
import { actionLogin } from "../../actionReducer";
function Logout(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(actionLogin(false));
    deleteAllCookies();
    navigate("/login");
    return(
        <>
            
        </>
    )
}
export default Logout;