import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router";
import MenuSider from "./MenuSider";
import { useState } from "react";
import { Link} from "react-router-dom";
import {HomeOutlined,LogoutOutlined,MenuFoldOutlined} from "@ant-design/icons";
import "./LayoutAdmin.scss";
function LayoutAdmin() {
  const [collapsed, setCollapse] = useState(false);
  return (
    <>
      <Layout className="layout__admin">
        <header className="layout__admin__header">
          <div className={"layout__admin__header__logo"+(collapsed ?"--collapsed":"")}>
            <Link to="/dashboard">{collapsed ? "ITA" : "IT Admin"}</Link>
          </div>
          <div className="layout__admin__header__nav">
            <div
              className="layout__admin__header__nav-left"
              onClick={() => setCollapse(!collapsed)}
            >
              <MenuFoldOutlined />
            </div>
            <div className="layout__admin__header__nav-right">
              <Link to="/">
                <Button icon={<HomeOutlined />}>Trang chủ</Button>
              </Link>
              <Link to="/login">
                <Button icon={<LogoutOutlined />}>Đăng xuất</Button>
              </Link>
            </div>
          </div>
        </header>
        <Layout>
          <Sider
            className="layout__admin__sider"
            theme="light"
            collapsed={collapsed}
          >
            <MenuSider />
          </Sider>
          <Content className="layout__admin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutAdmin;
