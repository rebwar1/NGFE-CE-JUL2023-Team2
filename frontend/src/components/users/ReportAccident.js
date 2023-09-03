// import React from "react";

// export default function ReportAccident() {
//   return <h1>report</h1>;
// }

//🍋
import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import All from "./All";
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
          <All user={user} />
        </Box>
      </ChakraProvider>
    </div>
  );
}
