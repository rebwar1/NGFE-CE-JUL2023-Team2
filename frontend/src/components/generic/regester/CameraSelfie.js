// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";

// function CameraSelfie() {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//   };

//   return (
//     <div>
//       <h1>Webcam Capture & Camera Selfie App</h1>
//       <Webcam
//         audio={false}
//         mirrored={true} // Mirror the video to simulate a selfie camera
//         ref={webcamRef}
//       />
//       <button onClick={captureImage}>Capture Selfie</button>
//       {capturedImage && (
//         <div>
//           <h2>Selfie Preview:</h2>
//           <img src={capturedImage} alt="Captured Selfie" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default CameraSelfie;
