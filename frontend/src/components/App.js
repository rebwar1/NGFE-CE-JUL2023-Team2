// import React, { useState, useEffect } from "react";
// import { ChakraProvider, Box } from "@chakra-ui/react";
// import "antd/dist/reset.css";
// import "../assets/css/general.css";
// import { Layout } from "antd";
// import { Routes, Route } from "react-router-dom";
// import Hedear from "./generic/Header";
// import Footer from "./generic/Footer";
// import Sidebar from "./generic/Sidebar";
// import DashboardLogin from "./generic/DashboardLogin";
// import DashboardSignup from "./generic/DashboardSignup";
// import ContactForm from "./users/ReportAccident";
// import Notification from "./users/Notification";
// import Boards from "./healthSafety/Boards";

// const { Content } = Layout;

// function App() {
//   const [users, setUsers] = useState([]);

//   return (
//     <div className="App">
//       <ChakraProvider>
//         <Layout>
//           <Hedear />
//           <Layout>
//             <Sidebar />
//             <Content className="content">
//               <Routes>
//                 <Route path="/login" element={<DashboardLogin />} />
//                 <Route path="/signup" element={<DashboardSignup />} />
//                 <Route path="/users/reportAccident" element={<ContactForm />} />
//                 <Route path="/users/notification" element={<Notification />} />
//                 <Route path="/healthSafety/boards" element={<Boards />} />
//               </Routes>
//             </Content>
//           </Layout>
//           <Footer />
//         </Layout>
//       </ChakraProvider>
//     </div>
//   );
// }

// export default App;
//✅
// App.js
import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider

import Hedear from "./generic/Header";
import Footer from "./generic/Footer";
import Sidebar from "./generic/Sidebar";
import DashboardLogin from "./generic/DashboardLogin";
import DashboardSignup from "./generic/DashboardSignup";
import ContactForm from "./users/ReportAccident";
import Notification from "./users/Notification";
import Boards from "./healthSafety/Boards";

const { Content } = Layout;

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Layout>
          <Hedear />
          <Layout>
            <Sidebar />
            <Content className="content">
              <Routes>
                <Route path="/login" element={<DashboardLogin />} />
                <Route path="/signup" element={<DashboardSignup />} />
                <Route path="/users/reportAccident" element={<ContactForm />} />
                <Route path="/users/notification" element={<Notification />} />
                <Route path="/healthSafety/boards" element={<Boards />} />
              </Routes>
            </Content>
          </Layout>
          <Footer />
        </Layout>
      </div>
    </ChakraProvider>
  );
}

export default App;
