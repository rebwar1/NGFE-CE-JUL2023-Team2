import React from "react";
import { Button, Card } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

const PrintButton = ({ handlePrint }) => (
  <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
    Print
  </Button>
);

const GridWithPrint = ({
  lastSubmittedData,
  lastSubmittedImage,
  printView,
  togglePrintView,
  cardRef, // Receive the cardRef as a prop
}) => {
  const handlePrint = () => {
    console.log("Printing...");
    window.print();
  };

  return (
    <div>
      {lastSubmittedData && (
        <div ref={cardRef}>
          <Card hoverable style={{ width: 240 }}>
            <img src={lastSubmittedImage} alt="Last Submitted" />{" "}
            {/* Use img tag */}
            <div>
              <strong>Name:</strong> {lastSubmittedData.name || ""}
            </div>
            <div>
              <strong>Family Name:</strong> {lastSubmittedData.familyName || ""}
            </div>
            <div>
              <strong>Email:</strong> {lastSubmittedData.email || ""}
            </div>
            <div>
              <strong>Vehicle Number:</strong>{" "}
              {lastSubmittedData.vehicleNumber || "N/A"}
            </div>
            <div>
              <strong>Company Name:</strong>{" "}
              {lastSubmittedData.companyName || ""}
            </div>
            <div>
              <strong>Timestamp:</strong> {lastSubmittedData.timestamp || ""}
            </div>
            {!printView ? (
              <PrintButton handlePrint={togglePrintView} />
            ) : (
              <PrintButton handlePrint={handlePrint} />
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

// export default GridWithPrint;
