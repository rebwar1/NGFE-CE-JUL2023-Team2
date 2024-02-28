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
// import DisplaySafetyCard from "./safetyCard/DisplaySafetyCard"; // Import the DisplaySafetyCard component

// import Signature from "./Signature"; // Import the Signature component

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
//   const [displayPrint, setDisplayPrint] = useState(false); // Define the displayPrint state

//   const [showSafetyCard, setShowSafetyCard] = useState(false);
//   const [showSafetyCardMessage, setShowSafetyCardMessage] = useState(false);

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

//   const handleAgreeAndPrint = () => {
//     // Implement the logic to handle user agreement and signature
//     // Once the user agrees and provides a signature, set displayPrint to true
//     setDisplayPrint(true);
//   };

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
//             <p className="normal-text margin-text">Visitor Photo</p>
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
//               displayPrint={displayPrint} // Corrected prop name
//               setShowSafetyCardMessage={setShowSafetyCardMessage}
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
//             <a href="https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=2a0e8bdf-ed64-4653-a96d-d636e553a289&env=demo&acct=5039d680-68b2-47e1-85de-af31e5b356cb&v=2">
//               NGFEE
//             </a>
//             <ReactToPrint
//               trigger={() => (
//                 <Button
//                   type="primary"
//                   icon={<PrinterOutlined />}
//                   block
//                   onClick={handleAgreeAndPrint}
//                 >
//                   Print
//                 </Button>
//               )}
//               content={() => cardRef.current}
//             />
//             {/* 🍇🍇🍇 Place your agreement and signature components here 🍇🍇🍇 */}
//             {/* <Signature userData={userData} /> */}
//             <a href="http://localhost:8000/" target="_blank">
//               <Button type="primary" block>
//                 Signature
//               </Button>
//             </a>
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
//🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆

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
import Boards from "../../healthSafety/Boards";
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
  const [signatureButtonClicked, setSignatureButtonClicked] = useState(false);

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
    <Row
      gutter={16}
      align="middle"
      textAlign="center"
      style={{ width: "100%", display: "inline-block" }}
    >
      <Col xs={24} md={12} style={{ width: "100%", display: "inline-block" }}>
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
            {/* <DisplaySafetyCard
              displayPrint={displayPrint} // Corrected prop name
              setShowSafetyCardMessage={setShowSafetyCardMessage}
            /> */}
            <Boards
              displayPrint={displayPrint}
              setShowSafetyCardMessage={setShowSafetyCardMessage}
            />
          </>
        )}

        {showSafetyCardMessage && !signatureButtonClicked && (
          <a
            href="http://localhost:8000/"
            target="_blank"
            onClick={() => setSignatureButtonClicked(true)}
          >
            <Button type="primary" block>
              Signature
            </Button>
          </a>
        )}

        {showSafetyCardMessage && signatureButtonClicked && (
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
                        src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-Europe-logo.jpg"
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
            <a href="https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=423da77f-891e-461b-92b3-6000ae3dd51b&env=demo&acct=5039d680-68b2-47e1-85de-af31e5b356cb&v=2">
              NGF
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
            {/* 🍇🍇🍇 Place your agreement and signature components here 🍇🍇🍇 */}
            {/* <Signature userData={userData} /> */}
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
