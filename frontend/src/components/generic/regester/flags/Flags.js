// src/App.js

import React from "react";
import "./App.css";
import { Layout } from "antd";
import CountryCardList from "./components/CountryCardList";

const { Header, Content } = Layout;

function Flags() {
  return (
    <Layout>
      <Header>Country Cards</Header>
      <Content style={{ padding: "20px" }}>
        <CountryCardList />
      </Content>
    </Layout>
  );
}

export default Flags;
