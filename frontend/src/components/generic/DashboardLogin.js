import React from "react";
import { Row, Col } from "antd";
import "../../assets/scss/dashboard.scss";
import FileTextTranslation from "./textTranslationPolly/FileTextTranslation";
import TextAreaTranslation from "./textTranslationPolly/TextAreaTranslation";

export default function DashboardLogin() {
  return (
    <div className="dashboard">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FileTextTranslation />
        </Col>
        <Col span={12}>
          <TextAreaTranslation />
        </Col>
      </Row>
    </div>
  );
}
