import { Menu } from "antd";
import {
  WindowsOutlined,
  UserOutlined,
  ReconciliationOutlined,
  ProfileOutlined ,
  PlusOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useParams } from "react-router-dom";
function MenuSider() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <WindowsOutlined />,
      key: "/admin",
    },
    {
      label: <Link to="/infoCompany">Thông tin công ty</Link>,
      icon: <UserOutlined />,
      key: "/infoCompany",
    },
    {
      label: <Link to="/manage-job">Quản lý việc làm</Link>,
      icon: <ReconciliationOutlined />,
      key: "/job",
    },
    {
      label: <Link to="/cv">Quản lý CV</Link>,
      icon:<ProfileOutlined />,
      key: "/cv",
    },
  ];
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={currentPath}
        defaultOpenKeys={[currentPath]}
        
      />
    </>
  );
}
export default MenuSider;
