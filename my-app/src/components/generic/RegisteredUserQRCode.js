import React from "react";
import { Form, Input, Button } from "antd";
import QRCode from "qrcode.react";
import CameraSelfie from "./CameraSelfie";

function RegisteredUserQRCode() {
  const [userData, setUserData] = React.useState({});
  const [qrData, setQRData] = React.useState("");

  const handleFormSubmit = values => {
    setUserData(values);
    setQRData(JSON.stringify(values));
  };

  return (
    <div>
      <Form onFinish={handleFormSubmit}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        {/* Add other input fields for user details */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Generate QR Code
          </Button>
        </Form.Item>
      </Form>
      {qrData && (
        <div>
          <QRCode value={qrData} />
        </div>
      )}
      <CameraSelfie />
    </div>
  );
}

export default RegisteredUserQRCode;
