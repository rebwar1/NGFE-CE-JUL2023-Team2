import React, { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import axiosClientWithoutHeader from "../../config/axios";
import QRCode from "qrcode.react";
import Webcam from "react-webcam";
import { Row, Col, Space, Spin } from "antd";
import { Image, Text } from "@chakra-ui/react";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { Card } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";

import "../../App.css";

const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
const URL = "/images";

const ErrorText = ({ children, ...props }) => (
  <Text fontSize="lg" color="red.300" {...props}>
    {children}
  </Text>
);

const Posts = () => {
  const [userData, setUserData] = useState({});
  const [qrData, setQRData] = useState("");
  const [lastSubmittedImage, setLastSubmittedImage] = useState(null);
  const [showCard, setShowCard] = useState(false); // Add showCard state variable

  const handleFormSubmit = async values => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const updatedValues = {
      ...values,
      timestamp: formattedDate,
    };

    setUserData(updatedValues);
    setQRData(JSON.stringify(updatedValues));

    try {
      const response = await axiosClientWithoutHeader.post(
        "/save-check-in",
        {
          ...updatedValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.status === 201 &&
        response.data.message === "Check-in saved successfully"
      ) {
        console.log("Check-in saved successfully!");
        message.success("Check-in saved successfully!");

        // You can access the saved data from the server response
        const savedData = response.data.savedData;

        // Handle the saved data as needed
        console.log("Saved Data:", savedData);
      } else {
        console.error("Error: Unable to save check-in.");
        message.error("Error: Unable to save check-in. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
      }
      message.error("Error: Unable to save check-in. Please try again later.");
    }
  };

  const [refetch, setRefetch] = useState(0);
  const webcamRef = useRef(null);
  const [imageUrls, setImageUrls] = useState([]);

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });

  const {
    data: fetchedImageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  const [error, setError] = useState("");

  const handleUpload = async () => {
    const imageData = webcamRef.current.getScreenshot();
    const blob = await fetch(imageData).then(r => r.blob());
    const fileType = blob.type;

    if (!validFileTypes.includes(fileType)) {
      setError("Invalid image format. Please use jpg, jpeg, or png.");
      return;
    }

    const form = new FormData();
    form.append("image", blob, "selfie." + fileType.split("/")[1]);

    try {
      // Upload the image and set showCard to true when the upload is successful
      await uploadImage(form);
      setShowCard(true); // Show the card
      setImageUrls(prevUrls => [imageData, ...prevUrls]);
      setLastSubmittedImage(imageData);
      setError("");
    } catch (error) {
      setError("Error uploading image. Please try again.");
    }
  };

  const cardRef = useRef(null);

  return (
    <Row gutter={16} align="middle">
      <Col xs={24} md={12}>
        <p className="normal-text margin-text">Driver check-in</p>
        <Form onFinish={handleFormSubmit}>
          <Form.Item label="Name" name="name" required>
            <Input />
          </Form.Item>
          <Form.Item label="Family Name" name="familyName" required>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Vehicle Registration Number"
            name="vehicleNumber"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item label="Company Name" name="companyName" required>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Generate QR Code
            </Button>
          </Form.Item>
        </Form>

        {/* {qrData && (
          <div>
            <QRCode value={qrData} />
            <p>Timestamp: {userData.timestamp}</p>
          </div>
        )} */}
      </Col>
      <Col xs={24} md={12}>
        <p className="normal-text margin-text">Take a selfie</p>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Space>
          <Button
            type="primary"
            className="capture"
            onClick={handleUpload}
            disabled={uploading} // Disable the button when uploading
          >
            Capture and Upload
          </Button>
          {uploading && <Spin />}
        </Space>
      </Col>
      <Col xs={24} md={24}>
        {imagesLoading && <Spin />}
        {fetchError && <ErrorText>{fetchError.message}</ErrorText>}
      </Col>
      <Col xs={24} md={24}>
        {showCard && userData && (
          <>
            <Card
              title={`${userData.name || ""} ${userData.familyName || ""}`}
              ref={cardRef}
              style={{ width: 400 }}
              cover={
                <Image
                  src={lastSubmittedImage || "/images/default-selfie.jpg"}
                  alt="Driver"
                />
              }
            >
              <div>
                <strong>Name:</strong> {userData.name || ""}
              </div>
              <div>
                <strong>Family Name:</strong> {userData.familyName || ""}
              </div>
              <div>
                <strong>Email:</strong> {userData.email || ""}
              </div>
              <div>
                <strong>Vehicle Number:</strong>{" "}
                {userData.vehicleNumber || "N/A"}
              </div>
              <div>
                <strong>Company Name:</strong> {userData.companyName || "N/A"}
              </div>
              <div>
                <strong>Timestamp:</strong> {userData.timestamp || ""}
              </div>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                {qrData && (
                  <div>
                    <QRCode
                      style={{
                        margin: "auto",
                      }}
                      value={qrData}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center", // Center the NGF Logo horizontally
                        marginTop: "1rem", // Add some margin between the QRCode and the logo
                      }}
                    >
                      <img
                        src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
                        alt="NGF Logo"
                        style={{
                          width: "200px",
                          height: "auto",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <ReactToPrint
              trigger={() => (
                <Button type="primary" icon={<PrinterOutlined />} block>
                  Print
                </Button>
              )}
              content={() => cardRef.current}
            />
          </>
        )}
      </Col>
      <Col xs={24}></Col>
    </Row>
  );
};

export default Posts;
