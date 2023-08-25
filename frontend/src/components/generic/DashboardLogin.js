import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import "../../assets/scss/dashboard.scss";
import CountryGrid from "../users/Notification"; // Import the CountryGrid component
import FileTextTranslation from "./textTranslationPolly/FileTextTranslation";
import TextAreaTranslation from "./textTranslationPolly/TextAreaTranslation";

export default function DashboardLogin() {
  const [showCountryGrid, setShowCountryGrid] = useState(false);

  return (
    <div className="dashboard">
      {showCountryGrid ? (
        <CountryGrid />
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <FileTextTranslation />
            {/* <TextAreaTranslation /> */}
          </Col>
          <Col span={12}>{/* Your TextAreaTranslation component */}</Col>
        </Row>
      )}
      {!showCountryGrid && (
        <Button onClick={() => setShowCountryGrid(true)}>
          Select Your Language
        </Button>
      )}
    </div>
  );
}

//💫
