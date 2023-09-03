import React from "react";
import { Layout, Space } from "antd";
import "../../assets/scss/header.scss";

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <div>
      <AntHeader
        className="header"
        style={{
          display: "flex",
          height: "auto",
          justifyContent: "space-between",
          alignItems: "center", // To vertically center content
          backgroundColor: "white", // Background color for the header
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
            alt="NGF Logo"
            style={{
              width: "200px",
              height: "auto",
              // marginTop: "auto",
              // marginBottom: "auto",
            }}
          />
        </div>

        <p className="normal-text">Driver & Vehicle Site Safety</p>
      </AntHeader>

      <AntHeader
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // To vertically center content
          backgroundColor: "#279EFF", // Background color for the second header
          height: "3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="blue-text">Environment, Health & Safety (EHS)</p>
        </div>
      </AntHeader>
    </div>
  );
}
