import React, { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import QRCode from "qrcode.react";
import Webcam from "react-webcam";
import { Row, Col, Space, Spin } from "antd";
import { Image, SimpleGrid, Text } from "@chakra-ui/react";
import { format } from "date-fns"; // Import the format function
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";

import "../../assets/scss/header.scss";

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

  const handleFormSubmit = async values => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");

    const updatedValues = {
      ...values,
      timestamp: formattedDate,
    };

    setUserData(updatedValues);
    setQRData(JSON.stringify(updatedValues));
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

    await uploadImage(form);

    setImageUrls(prevUrls => [imageData, ...prevUrls]);
    setError(""); // Clear any previous error
  };
  const handleQRFormSubmit = async () => {
    // Create a data object to send to the backend
    const formData = {
      ...userData,
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "), // Format the timestamp
    };

    // Send a POST request to your backend
    try {
      const response = await fetch("http://localhost:4000/save-check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        message.success("Check-in saved successfully!");
      } else {
        message.error("Error: Unable to save check-in.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error: Unable to save check-in. Please try again later.");
    }
  };

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
        {qrData && (
          <div>
            <QRCode value={qrData} />
            <p>Timestamp: {userData.timestamp}</p>
            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={handleQRFormSubmit}
            >
              Save Check-In
            </Button>
          </div>
        )}
      </Col>
      <Col xs={24} md={12} className="webcam-container">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <Button
          onClick={handleUpload}
          type="primary"
          block
          style={{ marginTop: 16 }}
          loading={uploading}
        >
          Upload Selfie
        </Button>
        {error && <ErrorText>{error}</ErrorText>}
        {uploadError && <ErrorText>{uploadError}</ErrorText>}
      </Col>
      <Col xs={24}>
        <Text textAlign="center" mt={4} fontSize="xl">
          Posts
        </Text>
        {imagesLoading && (
          <Spin size="large" style={{ textAlign: "center", marginTop: 16 }} />
        )}
        {fetchError && (
          <ErrorText textAlign="center">Failed to load images</ErrorText>
        )}
        {!fetchError && imageUrls?.length === 0 && (
          <Text textAlign="center" fontSize="lg" color="gray.500">
            No images found
          </Text>
        )}
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {imageUrls?.length > 0 &&
            imageUrls.map((url, index) => (
              <Image
                key={index}
                borderRadius={5}
                src={url}
                alt={`Selfie ${index + 1}`}
              />
            ))}
          {fetchedImageUrls?.length > 0 &&
            fetchedImageUrls.map((url, index) => (
              <Image
                key={index}
                borderRadius={5}
                src={url}
                alt={`Image ${index + 1}`}
              />
            ))}
        </SimpleGrid>
      </Col>
    </Row>
  );
};

export default Posts;
