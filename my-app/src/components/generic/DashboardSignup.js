import React from "react";

import RegisteredUserQRCode from "./RegisteredUserQRCode";
import "../../assets/scss/dashboard.scss";

export default function DashboardSignup() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    // Other user details
  };
  return (
    <div className="dashboard">
      <h1>Dashboard Signup</h1>
      <RegisteredUserQRCode user={user} />
    </div>
  );
}
