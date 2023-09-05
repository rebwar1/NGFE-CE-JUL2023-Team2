import React, { useState, useRef } from "react";
import { Modal, Button, Input } from "antd";
import SignatureCanvas from "react-signature-canvas";
// import { ErrorText } from "./Posts"; // Import ErrorText from your existing component

const AgreementSignature = ({
  showSignature,
  handleCancelSignature,
  handleAgreeAndPrint,
  setUseTypedName,
  useTypedName,
  signatureRef,
  error,
}) => {
  return (
    <Modal
      title="Signature"
      visible={showSignature}
      onCancel={handleCancelSignature}
      footer={[
        <Button key="cancel" onClick={handleCancelSignature}>
          Cancel
        </Button>,
        <Button key="use-typed-name" onClick={() => setUseTypedName(true)}>
          Use Typed Name
        </Button>,
        <Button
          key="use-signature"
          type="primary"
          onClick={handleAgreeAndPrint}
        >
          Use Signature
        </Button>,
      ]}
    >
      <p>I agree to accept all health and safety regulations and use.</p>
      {useTypedName ? (
        <Input
          ref={signatureRef}
          placeholder="Type your name as a signature"
          className="signature-input"
        />
      ) : (
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            width: 300,
            height: 150,
            className: "signature-pad",
          }}
        />
      )}
      {/* {error && <ErrorText>{error}</ErrorText>} */}
    </Modal>
  );
};

export default AgreementSignature;
