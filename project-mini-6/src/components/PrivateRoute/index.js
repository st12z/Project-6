import { Outlet, useNavigate } from "react-router";

function PrivateRoute(){
    const isLogin = true;
    const navigate = useNavigate();
    return(
        <>
            {isLogin ? <Outlet/> : navigate("/login") }
        </>
    )
}
export default PrivateRoute;