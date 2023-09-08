// import AgreementSignature from "./AgreementSignature";
// import { axiosClientWithoutHeader } from "../../../config/axios";
// import React, { useState, useRef } from "react";
// import { Form, Input, Button, message, Row, Col, Space, Spin } from "antd";
// import QRCode from "qrcode.react";
// import Webcam from "react-webcam";
// import { Image, Text } from "@chakra-ui/react";
// import useMutation from "../../../hooks/useMutation";
// import useQuery from "../../../hooks/useQuery";
// import { Card } from "antd";
// import { PrinterOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
// import DisplaySafetyCard from "../../healthSafety/Boards"; // Import the DisplaySafetyCard component

// import "../../../App.css";
// // Import the new component

// const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
// const URL = "/images";

// const ErrorText = ({ children, ...props }) => (
//   <Text fontSize="lg" color="red.300" {...props}>
//     {children}
//   </Text>
// );

// const Posts = () => {
//   const [userData, setUserData] = useState({});
//   const [qrData, setQRData] = useState("");
//   const [lastSubmittedImage, setLastSubmittedImage] = useState(null);
//   const [showForm, setShowForm] = useState(true);
//   const [showSelfieCapture, setShowSelfieCapture] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [showSignature, setShowSignature] = useState(false);
//   const [useTypedName, setUseTypedName] = useState(false); // Track whether to use typed name or signature

//   const handleFormSubmit = async values => {
//     const currentDate = new Date();
//     const formattedDate = currentDate
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const updatedValues = {
//       ...values,
//       timestamp: formattedDate,
//     };

//     setUserData(updatedValues);
//     setQRData(JSON.stringify(updatedValues));

//     try {
//       const response = await axiosClientWithoutHeader.post(
//         "/save-check-in",
//         {
//           ...updatedValues,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (
//         response.status === 201 &&
//         response.data.message === "Check-in saved successfully"
//       ) {
//         console.log("Check-in saved successfully!");
//         message.success("Check-in saved successfully!");

//         setShowForm(false);
//         setShowSelfieCapture(true);
//       } else {
//         console.error("Error: Unable to save check-in.");
//         message.error("Error: Unable to save check-in. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response) {
//         console.error("Response Data:", error.response.data);
//         console.error("Response Status:", error.response.status);
//       }
//       message.error("Error: Unable to save check-in. Please try again later.");
//     }
//   };

//   const [refetch, setRefetch] = useState(0);
//   const webcamRef = useRef(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const {
//     mutate: uploadImage,
//     isLoading: uploading,
//     error: uploadError,
//   } = useMutation({ url: URL });

//   const {
//     data: fetchedImageUrls = [],
//     isLoading: imagesLoading,
//     error: fetchError,
//   } = useQuery(URL, refetch);

//   const [error, setError] = useState("");

//   const handleUpload = async () => {
//     const imageData = webcamRef.current.getScreenshot();
//     const blob = await fetch(imageData).then(r => r.blob());
//     const fileType = blob.type;

//     if (!validFileTypes.includes(fileType)) {
//       setError("Invalid image format. Please use jpg, jpeg, or png.");
//       return;
//     }

//     const form = new FormData();
//     form.append("image", blob, "selfie." + fileType.split("/")[1]);

//     try {
//       await uploadImage(form);
//       setImageUrls(prevUrls => [imageData, ...prevUrls]);
//       setLastSubmittedImage(imageData);
//       setError("");
//       setShowSignature(true);
//     } catch (error) {
//       setError("Error uploading image. Please try again.");
//     }
//   };

//   const cardRef = useRef(null);
//   const signatureRef = useRef(null);

//   const handleAgreeAndPrint = async () => {
//     let signatureImage;

//     if (useTypedName) {
//       // Get the typed name from the Input field
//       const typedName = signatureRef.current.input.value;
//       signatureImage = typedName;
//     } else {
//       // Make sure the signatureCanvas reference is not null
//       if (!signatureRef.current) {
//         console.error("SignatureCanvas reference is null.");
//         return;
//       }
//       // Convert the drawn signature to an image data URL
//       signatureImage = signatureRef.current.getTrimmedCanvas().toDataURL();
//     }

//     setShowSignature(false);
//     setShowCard(true);
//     setImageUrls(prevUrls => [lastSubmittedImage, ...prevUrls]);
//     setLastSubmittedImage(lastSubmittedImage);
//     setError("");

//     // Upload the signature (typed name or drawn signature) to AWS S3 (you'll need to configure this part)
//     try {
//       const response = await uploadSignatureToS3(signatureImage);
//       // Handle the S3 response as needed
//       console.log("Signature uploaded to S3:", response);
//     } catch (error) {
//       setError("Error uploading signature. Please try again.");
//       console.error("Error uploading signature:", error);
//     }
//   };

//   const handleCancelSignature = () => {
//     setShowSignature(false);
//   };

//   // This is a placeholder function. You should replace it with your actual S3 upload code.
//   const uploadSignatureToS3 = async signatureImage => {
//     try {
//       // Your code to upload the signatureImage to AWS S3 goes here.
//       // You may use a library like AWS SDK or axios to upload the image to S3.

//       // Example using AWS SDK (make sure to configure AWS SDK):
//       // const AWS = require('aws-sdk');
//       // const s3 = new AWS.S3();
//       // const params = {
//       //   Bucket: 'your-s3-bucket-name',
//       //   Key: 'signature.jpg', // Change the filename as needed
//       //   Body: Buffer.from(signatureImage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
//       //   ContentType: 'image/jpeg', // Change the content type as needed
//       // };
//       // const result = await s3.upload(params).promise();

//       // Example using axios (you might need to configure axios properly):
//       // const response = await axios.post('your-s3-upload-url', {
//       //   image: signatureImage,
//       // });

//       // Return the response or result based on your S3 upload implementation.
//       return {
//         success: true,
//         message: "Signature uploaded to S3 successfully",
//       };
//     } catch (error) {
//       console.error("Error uploading signature to S3:", error);
//       throw error;
//     }
//   };

//   return (
//     <Row gutter={16} align="middle">
//       <Col xs={24} md={12}>
//         {showForm && (
//           <>
//             <p className="normal-text margin-text">Driver check-in</p>
//             <Form onFinish={handleFormSubmit}>
//               <Form.Item label="Name" name="name" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Family Name" name="familyName" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Email" name="email" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Vehicle Registration Number"
//                 name="vehicleNumber"
//                 required
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Company Name" name="companyName" required>
//                 <Input />
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block>
//                   Generate QR Code
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         )}
//         {showSelfieCapture && !showCard && (
//           <>
//             <p className="normal-text margin-text">Take a selfie</p>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               className="webcam"
//             />
//             {error && <ErrorText>{error}</ErrorText>}
//             <Space>
//               <Button
//                 type="primary"
//                 className="capture"
//                 onClick={handleUpload}
//                 disabled={uploading}
//               >
//                 Capture and Upload
//               </Button>
//               {uploading && <Spin />}
//             </Space>
//           </>
//         )}
//       </Col>
//       <Col xs={24} md={12}>
//         {imagesLoading && <Spin />}
//         {fetchError && <ErrorText>{fetchError.message}</ErrorText>}
//       </Col>
//       <Col xs={24} md={24}>
//         {showCard && userData && (
//           <>
//             <Card
//               title={`${userData.name || ""} ${userData.familyName || ""}`}
//               ref={cardRef}
//               style={{ width: 400 }}
//               cover={
//                 <Image
//                   src={lastSubmittedImage || "/images/default-selfie.jpg"}
//                   alt="Driver"
//                 />
//               }
//             >
//               <div>
//                 <strong>Name:</strong> {userData.name || ""}
//               </div>
//               <div>
//                 <strong>Family Name:</strong> {userData.familyName || ""}
//               </div>
//               <div>
//                 <strong>Email:</strong> {userData.email || ""}
//               </div>
//               <div>
//                 <strong>Vehicle Number:</strong>{" "}
//                 {userData.vehicleNumber || "N/A"}
//               </div>
//               <div>
//                 <strong>Company Name:</strong> {userData.companyName || "N/A"}
//               </div>
//               <div>
//                 <strong>Timestamp:</strong> {userData.timestamp || ""}
//               </div>
//               <div style={{ textAlign: "center", marginTop: "1rem" }}>
//                 {qrData && (
//                   <div>
//                     <QRCode
//                       style={{
//                         margin: "auto",
//                       }}
//                       value={qrData}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         marginTop: "1rem",
//                       }}
//                     >
//                       <img
//                         src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
//                         alt="NGF Logo"
//                         style={{
//                           width: "200px",
//                           height: "auto",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             <ReactToPrint
//               trigger={() => (
//                 <Button type="primary" icon={<PrinterOutlined />} block>
//                   Print
//                 </Button>
//               )}
//               content={() => cardRef.current}
//             />
//           </>
//         )}
//       </Col>
//       <Col xs={24}></Col>
//       <AgreementSignature
//         showSignature={showSignature}
//         handleCancelSignature={handleCancelSignature}
//         handleAgreeAndPrint={handleAgreeAndPrint}
//         setUseTypedName={setUseTypedName}
//         useTypedName={useTypedName}
//         signatureRef={signatureRef}
//         error={error}
//       />
//     </Row>
//   );
// };

// export default Posts;

//🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎
//🍏

// import { axiosClientWithoutHeader } from "../../../config/axios";
// import React, { useState, useRef } from "react";
// import { Form, Input, Button, message, Row, Col, Space, Spin } from "antd";
// import QRCode from "qrcode.react";
// import Webcam from "react-webcam";
// import { Image, Text } from "@chakra-ui/react";
// import useMutation from "../../../hooks/useMutation";
// import useQuery from "../../../hooks/useQuery";
// import { Card } from "antd";
// import { PrinterOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
// import DisplaySafetyCard from "../../healthSafety/Boards"; // Import the DisplaySafetyCard component

// import "../../../App.css";

// const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
// const URL = "/images";

// const ErrorText = ({ children, ...props }) => (
//   <Text fontSize="lg" color="red.300" {...props}>
//     {children}
//   </Text>
// );

// const Posts = () => {
//   const [userData, setUserData] = useState({});
//   const [qrData, setQRData] = useState("");
//   const [lastSubmittedImage, setLastSubmittedImage] = useState(null);
//   const [showForm, setShowForm] = useState(true);
//   const [showSelfieCapture, setShowSelfieCapture] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [displayPrint, setDisplayPrint] = useState();

//   const [showSafetyCard, setShowSafetyCard] = useState(false); // State to control showing safety card

//   const handleFormSubmit = async values => {
//     const currentDate = new Date();
//     const formattedDate = currentDate
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const updatedValues = {
//       ...values,
//       timestamp: formattedDate,
//     };

//     setUserData(updatedValues);
//     setQRData(JSON.stringify(updatedValues));

//     try {
//       const response = await axiosClientWithoutHeader.post(
//         "/save-check-in",
//         {
//           ...updatedValues,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (
//         response.status === 201 &&
//         response.data.message === "Check-in saved successfully"
//       ) {
//         console.log("Check-in saved successfully!");
//         message.success("Check-in saved successfully!");

//         // You can access the saved data from the server response
//         const savedData = response.data.savedData;

//         // Handle the saved data as needed
//         console.log("Saved Data:", savedData);

//         setShowForm(false);
//         setShowSelfieCapture(true);
//       } else {
//         console.error("Error: Unable to save check-in.");
//         message.error("Error: Unable to save check-in. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response) {
//         console.error("Response Data:", error.response.data);
//         console.error("Response Status:", error.response.status);
//       }
//       message.error("Error: Unable to save check-in. Please try again later.");
//     }
//   };

//   const [refetch, setRefetch] = useState(0);
//   const webcamRef = useRef(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const {
//     mutate: uploadImage,
//     isLoading: uploading,
//     error: uploadError,
//   } = useMutation({ url: URL });

//   const {
//     data: fetchedImageUrls = [],
//     isLoading: imagesLoading,
//     error: fetchError,
//   } = useQuery(URL, refetch);

//   const [error, setError] = useState("");

//   const handleUpload = async () => {
//     const imageData = webcamRef.current.getScreenshot();
//     const blob = await fetch(imageData).then(r => r.blob());
//     const fileType = blob.type;

//     if (!validFileTypes.includes(fileType)) {
//       setError("Invalid image format. Please use jpg, jpeg, or png.");
//       return;
//     }

//     const form = new FormData();
//     form.append("image", blob, "selfie." + fileType.split("/")[1]);

//     try {
//       // Upload the image and set showCard to true when the upload is successful
//       await uploadImage(form);
//       setShowCard(true); // Show the card
//       setImageUrls(prevUrls => [imageData, ...prevUrls]);
//       setLastSubmittedImage(imageData);
//       setError("");

//       // Show the safety card component
//       setShowSafetyCard(true);
//     } catch (error) {
//       setError("Error uploading image. Please try again.");
//     }
//   };

//   const cardRef = useRef(null);

//   return (
//     <Row gutter={16} align="middle">
//       <Col xs={24} md={12}>
//         {showForm && (
//           <>
//             <p className="normal-text margin-text">Driver check-in</p>
//             <Form onFinish={handleFormSubmit}>
//               <Form.Item label="Name" name="name" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Family Name" name="familyName" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Email" name="email" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Vehicle Registration Number"
//                 name="vehicleNumber"
//                 required
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Company Name" name="companyName" required>
//                 <Input />
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block>
//                   Generate QR Code
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         )}
//         {showSelfieCapture && !showCard && (
//           <>
//             <p className="normal-text margin-text">Take a selfie</p>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               className="webcam"
//             />
//             {error && <ErrorText>{error}</ErrorText>}
//             <Space>
//               <Button
//                 type="primary"
//                 className="capture"
//                 onClick={handleUpload}
//                 disabled={uploading}
//               >
//                 Capture and Upload
//               </Button>
//               {uploading && <Spin />}
//             </Space>
//           </>
//         )}
//         {showSafetyCard && <DisplaySafetyCard displyPrint={displayPrint} />}{" "}
//         {/* Conditionally render the safety card */}
//       </Col>
//       <Col xs={24} md={12}>
//         {imagesLoading && <Spin />}
//         {fetchError && <ErrorText>{fetchError.message}</ErrorText>}
//       </Col>
//       <Col xs={24} md={24}>
//         {displayPrint && showCard && userData && (
//           <>
//             <Card
//               title={`${userData.name || ""} ${userData.familyName || ""}`}
//               ref={cardRef}
//               style={{ width: 400 }}
//               cover={
//                 <Image
//                   src={lastSubmittedImage || "/images/default-selfie.jpg"}
//                   alt="Driver"
//                 />
//               }
//             >
//               <div>
//                 <strong>Name:</strong> {userData.name || ""}
//               </div>

//               <div>
//                 <strong>Family Name:</strong> {userData.familyName || ""}
//               </div>
//               <div>
//                 <strong>Email:</strong> {userData.email || ""}
//               </div>
//               <div>
//                 <strong>Vehicle Number:</strong>{" "}
//                 {userData.vehicleNumber || "N/A"}
//               </div>
//               <div>
//                 <strong>Company Name:</strong> {userData.companyName || "N/A"}
//               </div>
//               <div>
//                 <strong>Timestamp:</strong> {userData.timestamp || ""}
//               </div>
//               <div style={{ textAlign: "center", marginTop: "1rem" }}>
//                 {qrData && (
//                   <div>
//                     <QRCode
//                       style={{
//                         margin: "auto",
//                       }}
//                       value={qrData}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center", // Center the NGF Logo horizontally
//                         marginTop: "1rem", // Add some margin between the QRCode and the logo
//                       }}
//                     >
//                       <img
//                         src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
//                         alt="NGF Logo"
//                         style={{
//                           width: "200px",
//                           height: "auto",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             <ReactToPrint
//               trigger={() => (
//                 <Button type="primary" icon={<PrinterOutlined />} block>
//                   Print
//                 </Button>
//               )}
//               content={() => cardRef.current}
//             />
//           </>
//         )}
//       </Col>
//       <Col xs={24}></Col>
//     </Row>
//   );
// };

// export default Posts;

//🍎
// import { axiosClientWithoutHeader } from "../../../config/axios";
// import React, { useState, useRef } from "react";
// import { Form, Input, Button, message, Row, Col, Space, Spin } from "antd";
// import QRCode from "qrcode.react";
// import Webcam from "react-webcam";
// import { Image, Text } from "@chakra-ui/react";
// import useMutation from "../../../hooks/useMutation";
// import useQuery from "../../../hooks/useQuery";
// import { Card } from "antd";
// import { PrinterOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
// import DisplaySafetyCard from "../../healthSafety/Boards"; // Import the DisplaySafetyCard component

// import "../../../App.css";

// const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
// const URL = "/images";

// const ErrorText = ({ children, ...props }) => (
//   <Text fontSize="lg" color="red.300" {...props}>
//     {children}
//   </Text>
// );

// const Posts = () => {
//   const [userData, setUserData] = useState({});
//   const [qrData, setQRData] = useState("");
//   const [lastSubmittedImage, setLastSubmittedImage] = useState(null);
//   const [showForm, setShowForm] = useState(true);
//   const [showSelfieCapture, setShowSelfieCapture] = useState(false);
//   const [showCard, setShowCard] = useState(false);

//   const [showSafetyCard, setShowSafetyCard] = useState(false); // State to control showing safety card
//   const [showFullCardForPrint, setShowFullCardForPrint] = useState(false); // State to control showing full card for print

//   const handleFormSubmit = async values => {
//     const currentDate = new Date();
//     const formattedDate = currentDate
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const updatedValues = {
//       ...values,
//       timestamp: formattedDate,
//     };

//     setUserData(updatedValues);
//     setQRData(JSON.stringify(updatedValues));

//     try {
//       const response = await axiosClientWithoutHeader.post(
//         "/save-check-in",
//         {
//           ...updatedValues,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (
//         response.status === 201 &&
//         response.data.message === "Check-in saved successfully"
//       ) {
//         console.log("Check-in saved successfully!");
//         message.success("Check-in saved successfully!");

//         setShowForm(false);
//         setShowSelfieCapture(true);
//       } else {
//         console.error("Error: Unable to save check-in.");
//         message.error("Error: Unable to save check-in. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response) {
//         console.error("Response Data:", error.response.data);
//         console.error("Response Status:", error.response.status);
//       }
//       message.error("Error: Unable to save check-in. Please try again later.");
//     }
//   };

//   const [refetch, setRefetch] = useState(0);
//   const webcamRef = useRef(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const {
//     mutate: uploadImage,
//     isLoading: uploading,
//     error: uploadError,
//   } = useMutation({ url: URL });

//   const {
//     data: fetchedImageUrls = [],
//     isLoading: imagesLoading,
//     error: fetchError,
//   } = useQuery(URL, refetch);

//   const [error, setError] = useState("");

//   const handleUpload = async () => {
//     const imageData = webcamRef.current.getScreenshot();
//     const blob = await fetch(imageData).then(r => r.blob());
//     const fileType = blob.type;

//     if (!validFileTypes.includes(fileType)) {
//       setError("Invalid image format. Please use jpg, jpeg, or png.");
//       return;
//     }

//     const form = new FormData();
//     form.append("image", blob, "selfie." + fileType.split("/")[1]);

//     try {
//       await uploadImage(form);
//       setShowCard(true);
//       setImageUrls(prevUrls => [imageData, ...prevUrls]);
//       setLastSubmittedImage(imageData);
//       setError("");

//       // Show the safety card component initially
//       setShowSafetyCard(true);
//     } catch (error) {
//       setError("Error uploading image. Please try again.");
//     }
//   };

//   const cardRef = useRef(null);

//   return (
//     <Row gutter={16} align="middle">
//       <Col xs={24} md={12}>
//         {showForm && (
//           <>
//             <p className="normal-text margin-text">Driver check-in</p>
//             <Form onFinish={handleFormSubmit}>
//               <Form.Item label="Name" name="name" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Family Name" name="familyName" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Email" name="email" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Vehicle Registration Number"
//                 name="vehicleNumber"
//                 required
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Company Name" name="companyName" required>
//                 <Input />
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block>
//                   Generate QR Code
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         )}

//         {showSelfieCapture && !showCard && !showSafetyCard && (
//           <>
//             <p className="normal-text margin-text">Take a selfie</p>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               className="webcam"
//             />
//             {error && <ErrorText>{error}</ErrorText>}
//             <Space>
//               <Button
//                 type="primary"
//                 className="capture"
//                 onClick={handleUpload}
//                 disabled={uploading}
//               >
//                 Capture and Upload
//               </Button>
//               {uploading && <Spin />}
//             </Space>
//           </>
//         )}

//         {showSafetyCard && !showFullCardForPrint && (
//           <DisplaySafetyCard
//             onNext={() => setShowFullCardForPrint(true)} // Callback to show the full card for print
//           />
//         )}

//         {showFullCardForPrint && showCard && userData && (
//           // Full card for print
//           <>
//             <Card
//               title={`${userData.name || ""} ${userData.familyName || ""}`}
//               ref={cardRef}
//               style={{ width: 400 }}
//               cover={
//                 <Image
//                   src={lastSubmittedImage || "/images/default-selfie.jpg"}
//                   alt="Driver"
//                 />
//               }
//             >
//               <div>
//                 <strong>Name:</strong> {userData.name || ""}
//               </div>
//               <div>
//                 <strong>Family Name:</strong> {userData.familyName || ""}
//               </div>
//               <div>
//                 <strong>Email:</strong> {userData.email || ""}
//               </div>
//               <div>
//                 <strong>Vehicle Number:</strong>{" "}
//                 {userData.vehicleNumber || "N/A"}
//               </div>
//               <div>
//                 <strong>Company Name:</strong> {userData.companyName || "N/A"}
//               </div>
//               <div>
//                 <strong>Timestamp:</strong> {userData.timestamp || ""}
//               </div>
//               <div style={{ textAlign: "center", marginTop: "1rem" }}>
//                 {qrData && (
//                   <div>
//                     <QRCode
//                       style={{
//                         margin: "auto",
//                       }}
//                       value={qrData}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center", // Center the NGF Logo horizontally
//                         marginTop: "1rem", // Add some margin between the QRCode and the logo
//                       }}
//                     >
//                       <img
//                         src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
//                         alt="NGF Logo"
//                         style={{
//                           width: "200px",
//                           height: "auto",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             <ReactToPrint
//               trigger={() => (
//                 <Button type="primary" icon={<PrinterOutlined />} block>
//                   Print
//                 </Button>
//               )}
//               content={() => cardRef.current}
//             />
//           </>
//         )}
//       </Col>
//       <Col xs={24} md={12}>
//         {imagesLoading && <Spin />}
//         {fetchError && <ErrorText>{fetchError.message}</ErrorText>}
//       </Col>
//       <Col xs={24}></Col>
//     </Row>
//   );
// };

// export default Posts;

//🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗
// import { axiosClientWithoutHeader } from "../../../config/axios";
// // import FileTextTranslation from "../textTranslationPolly/FileTextTranslation";
// // import DashboardLogin from "../DashboardLogin";

// // import CountryCardList from "./flags/CountryCardList";
// import React, { useState, useRef } from "react";
// import { Form, Input, Button, message, Row, Col, Space, Spin } from "antd";
// import QRCode from "qrcode.react";
// import Webcam from "react-webcam";
// import { Image, Text } from "@chakra-ui/react";
// import useMutation from "../../../hooks/useMutation";
// import useQuery from "../../../hooks/useQuery";
// import { Card } from "antd";
// import { PrinterOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
// import DisplaySafetyCard from "../../healthSafety/Boards"; // Import the DisplaySafetyCard component

// import "../../../App.css";

// const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
// const URL = "/images";

// const ErrorText = ({ children, ...props }) => (
//   <Text fontSize="lg" color="red.300" {...props}>
//     {children}
//   </Text>
// );

// const Posts = () => {
//   const [userData, setUserData] = useState({});
//   const [qrData, setQRData] = useState("");
//   const [lastSubmittedImage, setLastSubmittedImage] = useState(null);
//   const [showForm, setShowForm] = useState(true);
//   const [showSelfieCapture, setShowSelfieCapture] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [displayPrint, setDisplayPrint] = useState();

//   const [showSafetyCard, setShowSafetyCard] = useState(false); // State to control showing safety card
//   const [showSafetyCardMessage, setShowSafetyCardMessage] = useState(false); // State to control showing safety card message

//   const handleFormSubmit = async values => {
//     const currentDate = new Date();
//     const formattedDate = currentDate
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const updatedValues = {
//       ...values,
//       timestamp: formattedDate,
//     };

//     setUserData(updatedValues);
//     setQRData(JSON.stringify(updatedValues));

//     try {
//       const response = await axiosClientWithoutHeader.post(
//         "/save-check-in",
//         {
//           ...updatedValues,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (
//         response.status === 201 &&
//         response.data.message === "Check-in saved successfully"
//       ) {
//         console.log("Check-in saved successfully!");
//         message.success("Check-in saved successfully!");

//         // You can access the saved data from the server response
//         const savedData = response.data.savedData;

//         // Handle the saved data as needed
//         console.log("Saved Data:", savedData);

//         setShowForm(false);
//         setShowSelfieCapture(true);
//       } else {
//         console.error("Error: Unable to save check-in.");
//         message.error("Error: Unable to save check-in. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response) {
//         console.error("Response Data:", error.response.data);
//         console.error("Response Status:", error.response.status);
//       }
//       message.error("Error: Unable to save check-in. Please try again later.");
//     }
//   };

//   const [refetch, setRefetch] = useState(0);
//   const webcamRef = useRef(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const {
//     mutate: uploadImage,
//     isLoading: uploading,
//     error: uploadError,
//   } = useMutation({ url: URL });

//   const {
//     data: fetchedImageUrls = [],
//     isLoading: imagesLoading,
//     error: fetchError,
//   } = useQuery(URL, refetch);

//   const [error, setError] = useState("");

//   const handleUpload = async () => {
//     const imageData = webcamRef.current.getScreenshot();
//     const blob = await fetch(imageData).then(r => r.blob());
//     const fileType = blob.type;

//     if (!validFileTypes.includes(fileType)) {
//       setError("Invalid image format. Please use jpg, jpeg, or png.");
//       return;
//     }

//     const form = new FormData();
//     form.append("image", blob, "selfie." + fileType.split("/")[1]);

//     try {
//       // Upload the image and set showCard to true when the upload is successful
//       await uploadImage(form);
//       setShowCard(true); // Show the card
//       setImageUrls(prevUrls => [imageData, ...prevUrls]);
//       setLastSubmittedImage(imageData);
//       setError("");

//       // Show the safety card component
//       setShowSafetyCard(true);
//     } catch (error) {
//       setError("Error uploading image. Please try again.");
//     }
//   };

//   const cardRef = useRef(null);

//   return (
//     <Row gutter={16} align="middle" style={{ width: "auto" }}>
//       <Col xs={24} md={12}>
//         {showForm && (
//           <>
//             <p className="normal-text margin-text">Driver check-in</p>
//             <Form onFinish={handleFormSubmit}>
//               <Form.Item label="Name" name="name" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Family Name" name="familyName" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Email" name="email" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Vehicle Registration Number"
//                 name="vehicleNumber"
//                 required
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Company Name" name="companyName" required>
//                 <Input />
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block>
//                   Generate QR Code
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         )}
//         {showSelfieCapture && !showCard && (
//           <>
//             <p className="normal-text margin-text">Take a selfie</p>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               className="webcam"
//             />
//             {error && <ErrorText>{error}</ErrorText>}
//             <Space>
//               <Button
//                 type="primary"
//                 className="capture"
//                 onClick={handleUpload}
//                 disabled={uploading}
//               >
//                 Capture and Upload
//               </Button>
//               {uploading && <Spin />}
//             </Space>
//           </>
//         )}
// {/* {showSafetyCard && (
//   <DisplaySafetyCard
//     displyPrint={displayPrint}
//     setShowSafetyCardMessage={setShowSafetyCardMessage}
//   />
// )} */}
// {showSafetyCard && !showSafetyCardMessage && (
//   <>
//     <DisplaySafetyCard
//       displyPrint={displayPrint}
//       setShowSafetyCardMessage={setShowSafetyCardMessage}
//     />
//     {/* <CountryCardList /> */}
//     {/* <DashboardLogin /> */}
//     {/* <DashboardLogin /> */}
//   </>
// )}

//         {showSafetyCardMessage && (
//           <>
//             <Card
//               title={`${userData.name || ""} ${userData.familyName || ""}`}
//               ref={cardRef}
//               style={{ width: 400 }}
//               cover={
//                 <Image
//                   src={lastSubmittedImage || "/images/default-selfie.jpg"}
//                   alt="Driver"
//                 />
//               }
//             >
//               <div>
//                 <strong>Name:</strong> {userData.name || ""}
//               </div>

//               <div>
//                 <strong>Family Name:</strong> {userData.familyName || ""}
//               </div>
//               <div>
//                 <strong>Email:</strong> {userData.email || ""}
//               </div>
//               <div>
//                 <strong>Vehicle Number:</strong>{" "}
//                 {userData.vehicleNumber || "N/A"}
//               </div>
//               <div>
//                 <strong>Company Name:</strong> {userData.companyName || "N/A"}
//               </div>
//               <div>
//                 <strong>Timestamp:</strong> {userData.timestamp || ""}
//               </div>
//               <div style={{ textAlign: "center", marginTop: "1rem" }}>
//                 {qrData && (
//                   <div>
//                     <QRCode
//                       style={{
//                         margin: "auto",
//                       }}
//                       value={qrData}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         marginTop: "1rem",
//                       }}
//                     >
//                       <img
//                         src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
//                         alt="NGF Logo"
//                         style={{
//                           width: "200px",
//                           height: "auto",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             <ReactToPrint
//               trigger={() => (
//                 <Button type="primary" icon={<PrinterOutlined />} block>
//                   Print
//                 </Button>
//               )}
//               content={() => cardRef.current}
//             />
//           </>
//         )}
//       </Col>
//       <Col xs={24} md={12}>
//         {imagesLoading && <Spin />}
//         {fetchError && <ErrorText>{fetchError.message}</ErrorText>}
//       </Col>
//       <Col xs={24} md={24}></Col>
//     </Row>
//   );
// };

// export default Posts;

//🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗🍋🚗
import { axiosClientWithoutHeader } from "../../../config/axios";
import React, { useState, useRef } from "react";
import { Form, Input, Button, message, Row, Col, Space, Spin } from "antd";
import QRCode from "qrcode.react";
import Webcam from "react-webcam";
import { Image, Text } from "@chakra-ui/react";
import useMutation from "../../../hooks/useMutation";
import useQuery from "../../../hooks/useQuery";
import { Card } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import DisplaySafetyCard from "./safetyCard/DisplaySafetyCard"; // Import the DisplaySafetyCard component

import "../../../App.css";

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
  const [showForm, setShowForm] = useState(true);
  const [showSelfieCapture, setShowSelfieCapture] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [displayPrint, setDisplayPrint] = useState(false); // Define the displayPrint state

  const [showSafetyCard, setShowSafetyCard] = useState(false);
  const [showSafetyCardMessage, setShowSafetyCardMessage] = useState(false);

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

        const savedData = response.data.savedData;
        console.log("Saved Data:", savedData);

        setShowForm(false);
        setShowSelfieCapture(true);
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
      await uploadImage(form);
      setShowCard(true);
      setImageUrls(prevUrls => [imageData, ...prevUrls]);
      setLastSubmittedImage(imageData);
      setError("");
      setShowSafetyCard(true);
    } catch (error) {
      setError("Error uploading image. Please try again.");
    }
  };

  const cardRef = useRef(null);

  const handleAgreeAndPrint = () => {
    // Implement the logic to handle user agreement and signature
    // Once the user agrees and provides a signature, set displayPrint to true
    setDisplayPrint(true);
  };

  return (
    <Row gutter={16} align="middle" style={{ width: "auto" }}>
      <Col xs={24} md={12}>
        {showForm && (
          <>
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
          </>
        )}
        {showSelfieCapture && !showCard && (
          <>
            <p className="normal-text margin-text">Visitor Photo</p>
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
                disabled={uploading}
              >
                Capture and Upload
              </Button>
              {uploading && <Spin />}
            </Space>
          </>
        )}
        {showSafetyCard && !showSafetyCardMessage && (
          <>
            <DisplaySafetyCard
              displayPrint={displayPrint} // Corrected prop name
              setShowSafetyCardMessage={setShowSafetyCardMessage}
            />
            {/* Place your agreement and signature components here */}
          </>
        )}

        {showSafetyCardMessage && (
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
                        justifyContent: "center",
                        marginTop: "1rem",
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
            <a href="https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=2a0e8bdf-ed64-4653-a96d-d636e553a289&env=demo&acct=5039d680-68b2-47e1-85de-af31e5b356cb&v=2">
              NGFEE
            </a>
            <ReactToPrint
              trigger={() => (
                <Button
                  type="primary"
                  icon={<PrinterOutlined />}
                  block
                  onClick={handleAgreeAndPrint}
                >
                  Print
                </Button>
              )}
              content={() => cardRef.current}
            />
          </>
        )}
      </Col>
      <Col xs={24} md={12}>
        {imagesLoading && <Spin />}
        {fetchError && <ErrorText>{fetchError.message}</ErrorText>}
      </Col>
      <Col xs={24} md={24}></Col>
    </Row>
  );
};

export default Posts;
//🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆

// import { axiosClientWithoutHeader } from "../../../config/axios";
// import React, { useState, useRef } from "react";
// import { Form, Input, Button, message, Row, Col, Space, Spin } from "antd";
// import QRCode from "qrcode.react";
// import Webcam from "react-webcam";
// import { Image, Text } from "@chakra-ui/react";
// import useMutation from "../../../hooks/useMutation";
// import useQuery from "../../../hooks/useQuery";
// import { Card } from "antd";
// import { PrinterOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
// import DisplaySafetyCard from "../../healthSafety/Boards";

// // Import the agreement and signature components
// import Agreement from "./agreement/Agreement"; // Import the Agreement component
// import Signature from "./agreement/Signature";

// import "../../../App.css";

// const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
// const URL = "/images";

// const ErrorText = ({ children, ...props }) => (
//   <Text fontSize="lg" color="red.300" {...props}>
//     {children}
//   </Text>
// );

// const Posts = () => {
//   const [userData, setUserData] = useState({});
//   const [qrData, setQRData] = useState("");
//   const [lastSubmittedImage, setLastSubmittedImage] = useState(null);
//   const [showForm, setShowForm] = useState(true);
//   const [showSelfieCapture, setShowSelfieCapture] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [displayPrint, setDisplayPrint] = useState(false);

//   const [showSafetyCard, setShowSafetyCard] = useState(false);
//   const [showSafetyCardMessage, setShowSafetyCardMessage] = useState(false);

//   const [isAgreed, setIsAgreed] = useState(false);
//   const [isSignatureValid, setIsSignatureValid] = useState(false);
//   const [userName, setUserName] = useState("");

//   const handleFormSubmit = async values => {
//     const currentDate = new Date();
//     const formattedDate = currentDate
//       .toISOString()
//       .slice(0, 19)
//       .replace("T", " ");

//     const updatedValues = {
//       ...values,
//       timestamp: formattedDate,
//     };

//     setUserData(updatedValues);
//     setQRData(JSON.stringify(updatedValues));

//     try {
//       const response = await axiosClientWithoutHeader.post(
//         "/save-check-in",
//         {
//           ...updatedValues,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (
//         response.status === 201 &&
//         response.data.message === "Check-in saved successfully"
//       ) {
//         console.log("Check-in saved successfully!");
//         message.success("Check-in saved successfully!");

//         const savedData = response.data.savedData;
//         console.log("Saved Data:", savedData);

//         setShowForm(false);
//         setShowSelfieCapture(true);
//       } else {
//         console.error("Error: Unable to save check-in.");
//         message.error("Error: Unable to save check-in. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response) {
//         console.error("Response Data:", error.response.data);
//         console.error("Response Status:", error.response.status);
//       }
//       message.error("Error: Unable to save check-in. Please try again later.");
//     }
//   };

//   const [refetch, setRefetch] = useState(0);
//   const webcamRef = useRef(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const {
//     mutate: uploadImage,
//     isLoading: uploading,
//     error: uploadError,
//   } = useMutation({ url: URL });

//   const {
//     data: fetchedImageUrls = [],
//     isLoading: imagesLoading,
//     error: fetchError,
//   } = useQuery(URL, refetch);

//   const [error, setError] = useState("");

//   const handleUpload = async () => {
//     const imageData = webcamRef.current.getScreenshot();
//     const blob = await fetch(imageData).then(r => r.blob());
//     const fileType = blob.type;

//     if (!validFileTypes.includes(fileType)) {
//       setError("Invalid image format. Please use jpg, jpeg, or png.");
//       return;
//     }

//     const form = new FormData();
//     form.append("image", blob, "selfie." + fileType.split("/")[1]);

//     try {
//       await uploadImage(form);
//       setShowCard(true);
//       setImageUrls(prevUrls => [imageData, ...prevUrls]);
//       setLastSubmittedImage(imageData);
//       setError("");
//       setShowSafetyCard(true);
//     } catch (error) {
//       setError("Error uploading image. Please try again.");
//     }
//   };

//   const cardRef = useRef(null);

//   return (
//     <Row gutter={16} align="middle" style={{ width: "auto" }}>
//       <Col xs={24} md={12}>
//         {showForm && (
//           <>
//             <p className="normal-text margin-text">Driver check-in</p>
//             <Form onFinish={handleFormSubmit}>
//               <Form.Item label="Name" name="name" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Family Name" name="familyName" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Email" name="email" required>
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Vehicle Registration Number"
//                 name="vehicleNumber"
//                 required
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Company Name" name="companyName" required>
//                 <Input />
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block>
//                   Generate QR Code
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         )}
//         {showSelfieCapture && !showCard && (
//           <>
//             <p className="normal-text margin-text">Take a selfie</p>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               className="webcam"
//             />
//             {error && <ErrorText>{error}</ErrorText>}
//             <Space>
//               <Button
//                 type="primary"
//                 className="capture"
//                 onClick={handleUpload}
//                 disabled={uploading}
//               >
//                 Capture and Upload
//               </Button>
//               {uploading && <Spin />}
//             </Space>
//           </>
//         )}
//         {showSafetyCard && !showSafetyCardMessage && (
//           <>
//             <DisplaySafetyCard
//               displyPrint={displayPrint}
//               setShowSafetyCardMessage={setShowSafetyCardMessage}
//             />

//             <Agreement isAgreed={isAgreed} onAgree={() => setIsAgreed(true)} />
//             <Signature
//               isValid={isSignatureValid}
//               onSignatureValid={() => setIsSignatureValid(true)}
//               onSignatureClear={() => setIsSignatureValid(false)}
//               onUserNameChange={name => setUserName(name)}
//             />
//           </>
//         )}

//         {showSafetyCardMessage && (
//           <>
//             <Card
//               title={`${userData.name || ""} ${userData.familyName || ""}`}
//               ref={cardRef}
//               style={{ width: 400 }}
//               cover={
//                 <Image
//                   src={lastSubmittedImage || "/images/default-selfie.jpg"}
//                   alt="Driver"
//                 />
//               }
//             >
//               <div>
//                 <strong>Name:</strong> {userData.name || ""}
//               </div>

//               <div>
//                 <strong>Family Name:</strong> {userData.familyName || ""}
//               </div>
//               <div>
//                 <strong>Email:</strong> {userData.email || ""}
//               </div>
//               <div>
//                 <strong>Vehicle Number:</strong>{" "}
//                 {userData.vehicleNumber || "N/A"}
//               </div>
//               <div>
//                 <strong>Company Name:</strong> {userData.companyName || "N/A"}
//               </div>
//               <div>
//                 <strong>Timestamp:</strong> {userData.timestamp || ""}
//               </div>
//               <div style={{ textAlign: "center", marginTop: "1rem" }}>
//                 {qrData && (
//                   <div>
//                     <QRCode
//                       style={{
//                         margin: "auto",
//                       }}
//                       value={qrData}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         marginTop: "1rem",
//                       }}
//                     >
//                       <img
//                         src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
//                         alt="NGF Logo"
//                         style={{
//                           width: "200px",
//                           height: "auto",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>

//             {isAgreed && isSignatureValid && (
//               <ReactToPrint
//                 trigger={() => (
//                   <Button
//                     type="primary"
//                     icon={<PrinterOutlined />}
//                     block
//                     onClick={() => setDisplayPrint(true)}
//                   >
//                     Print
//                   </Button>
//                 )}
//                 content={() => cardRef.current}
//               />
//             )}
//           </>
//         )}
//       </Col>
//       <Col xs={24} md={12}>
//         {imagesLoading && <Spin />}
//         {fetchError && <ErrorText>{fetchError.message}</ErrorText>}
//       </Col>
//       <Col xs={24} md={24}></Col>
//     </Row>
//   );
// };

// export default Posts;
