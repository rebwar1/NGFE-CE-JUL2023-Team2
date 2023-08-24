import React, { useState, useRef } from "react";
import { Form, Input, Button as button } from "antd";
import QRCode from "qrcode.react";
import Webcam from "react-webcam";
import {
  Box,
  Button,
  CircularProgress,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";

const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
const URL = "/images";

const ErrorText = ({ children, ...props }) => (
  <Text fontSize="lg" color="red.300" {...props}>
    {children}
  </Text>
);

const Posts = () => {
  const [userData, setUserData] = React.useState({});
  const [qrData, setQRData] = React.useState("");

  const handleFormSubmit = values => {
    setUserData(values);
    setQRData(JSON.stringify(values));
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

  return (
    <Box mt={6}>
      <Form onFinish={handleFormSubmit}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        {/* Add other input fields for user details */}
        <Form.Item>
          <button type="primary" htmlType="submit">
            Generate QR Code
          </button>
        </Form.Item>
      </Form>
      {qrData && (
        <div>
          <QRCode value={qrData} />
        </div>
      )}

      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />

      <Button
        onClick={handleUpload}
        colorScheme="blue"
        variant="outline"
        mb={4}
        cursor="pointer"
        isLoading={uploading}
      >
        Upload Selfie
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
      {uploadError && <ErrorText>{uploadError}</ErrorText>}

      <Text textAlign="left" mb={4}>
        Posts
      </Text>
      {imagesLoading && (
        <CircularProgress
          color="gray.600"
          trackColor="blue.300"
          size={7}
          thickness={10}
          isIndeterminate
        />
      )}
      {fetchError && (
        <ErrorText textAlign="left">Failed to load images</ErrorText>
      )}
      {!fetchError && imageUrls?.length === 0 && (
        <Text textAlign="left" fontSize="lg" color="gray.500">
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
    </Box>
  );
};

export default Posts;
// //🍉🍉🍉🍉🍉🍉🍉🍉
