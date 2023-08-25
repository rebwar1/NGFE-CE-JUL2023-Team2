import {
  UserOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  OrderedListOutlined,
  SearchOutlined,
  DashboardOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
// import Link from "antd/es/typography/Link";
import { Link } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <DashboardOutlined />, [
    getItem(<Link to="/login">log in</Link>, "login", <LoginOutlined />),
    getItem(<Link to="/signup">sign up</Link>, "signup", <UserOutlined />),
  ]),
  getItem("Users management", "users", <UserSwitchOutlined />, [
    getItem(
      <Link to="/users/reportAccident">Report accident</Link>,
      "post",
      <UsergroupAddOutlined />
    ),
    getItem(
      <Link to="/users/notification">Notification</Link>,
      "list",
      <OrderedListOutlined />
    ),
    getItem(
      <Link to="/users/translators/translator">Translators</Link>,
      "trans",
      <OrderedListOutlined />
    ),
  ]),
  getItem("Health and Safety", "healthSafety", <SearchOutlined />, [
    getItem(
      <Link to="/healthSafety/boards">Site Safety Boards & Banners</Link>,
      "search",
      <SearchOutlined />
    ),
  ]),
  getItem("Settings", "setting", <SettingOutlined />, [getItem("Option", "9")]),
];

const rootSubmenuKeys = ["dashboard", "users", "healthSafety", "setting"];

export default function Sidebar() {
  const [openKeys, setOpenKeys] = useState([
    "healthSafety",
    "users",
    "dashboard",
  ]);
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div>
      <Sider>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
          }}
          items={items}
        />
      </Sider>
    </div>
  );
}
