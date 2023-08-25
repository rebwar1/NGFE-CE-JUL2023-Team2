import React from "react";
import { Row, Col } from "antd";
import "../../../assets/scss/dashboard.scss";
import TranslatorsTextArea from "./TranslatorsTextArea";
import TranslatorsFileText from "./TranslatorsFileText";

export default function DashboardLogin() {
  return (
    <div className="dashboard">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <TranslatorsFileText />
        </Col>
        <Col span={12}>
          <TranslatorsTextArea />
        </Col>
      </Row>
    </div>
  );
}
