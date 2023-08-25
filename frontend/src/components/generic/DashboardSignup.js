import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
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
      <ChakraProvider>
        <Box textAlign="center" fontSize="2xl" m="3rem auto" p={5} maxW={700}>
          <RegisteredUserQRCode user={user} />
        </Box>
      </ChakraProvider>
    </div>
  );
}
