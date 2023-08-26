import {
  SettingOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  SearchOutlined,
  DashboardOutlined,
  TranslationOutlined,
  FlagOutlined,
  SafetyOutlined,
  AntDesignOutlined,
  AudioOutlined,
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
    getItem(<Link to="/signup">sign up</Link>, "signup", <AntDesignOutlined />),
    getItem(<Link to="/login">Language TTS</Link>, "login", <AudioOutlined />),
  ]),
  getItem("Users management", "users", <UserSwitchOutlined />, [
    getItem(
      <Link to="/users/reportAccident">Report accident</Link>,
      "post",
      <UsergroupAddOutlined />
    ),
    getItem(
      <Link to="/users/notification">Flag TTS</Link>,
      "list",
      <FlagOutlined />
    ),
    getItem(
      <Link to="/users/translators/translator">Translators</Link>,
      "trans",
      <TranslationOutlined />
    ),
  ]),
  getItem("Health and Safety", "healthSafety", <SearchOutlined />, [
    getItem(
      <Link to="/healthSafety/boards">Site Safety Boards & Banners</Link>,
      "search",
      <SafetyOutlined />
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
