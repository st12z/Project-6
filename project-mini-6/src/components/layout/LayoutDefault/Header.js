import { Link } from "react-router-dom";
import { Button } from "antd";
import { getCookie } from "../../../helper/cookie";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
function Header() {
  const token = getCookie("token");
  const state = useSelector(state =>state.LoginReducer);
  console.log(state);
  console.log(token);
  return (
    <>
      <header className="layout-default__header">
        <div className="layout-default__logo">
          <Link to="/">IT Job</Link>
        </div>
        <div className="layout-default__account">
          {!token && (
            <div className="layout-default__button">
              <Link to="/login">
                <Button>Đăng nhập</Button>
              </Link>
            </div>
          )}
          {token && (
            <div className="layout-default__button">
              <Link to="/admin">
                <Button type="" icon=<UserOutlined />>
                  Quản lý
                </Button>
              </Link>
            </div>
          )}
          {token && (
            <div className="layout-default__button">
              <Link to="/logout">
                <Button>Đăng xuất</Button>
              </Link>
            </div>
          )}

          {!token && (
            <div className="layout-default__button">
              <Link to="/register">
                <Button type="primary">Đăng kí</Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
export default Header;
