import "../../assets/css/general.css";

import { Card, Col, Row } from "antd";

import React from "react";

const { Meta } = Card;

function Boards() {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 500 }}
        cover={
          <img alt="Safety GIF" src={require("../../assets/img/safety.gif")} />
        }
      >
        <Meta title="Card title" description="This is the description" />
      </Card>
    </div>
  );
}

export default Boards;
