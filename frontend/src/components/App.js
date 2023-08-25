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
//✅✅✅✅✅✅✅✅✅✅
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
//✅✅✅✅✅✅✅✅✅✅
// import React, { useEffect } from "react";
// import { Layout } from "antd";
// import { Routes, Route } from "react-router-dom";
// import { ChakraProvider } from "@chakra-ui/react";
// import { useTranslation, I18nextProvider } from "react-i18next"; // Import I18nextProvider
// import i18next from "i18next";
// import cookies from "js-cookie";
// import classNames from "classnames";

// import Hedear from "./generic/Header";
// import Footer from "./generic/Footer";
// import Sidebar from "./generic/Sidebar";
// import DashboardLogin from "./generic/DashboardLogin";
// import DashboardSignup from "./generic/DashboardSignup";
// import ContactForm from "./users/ReportAccident";
// import Notification from "./users/Notification";
// import Boards from "./healthSafety/Boards";

// const { Content } = Layout;

// const languages = [
//   {
//     code: "fr",
//     name: "Français",
//     country_code: "fr",
//   },
//   {
//     code: "en",
//     name: "English",
//     country_code: "gb",
//   },
//   {
//     code: "ar",
//     name: "العربية",
//     dir: "rtl",
//     country_code: "sa",
//   },
// ];

// const GlobeIcon = ({ width = 24, height = 24 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={width}
//     height={height}
//     fill="currentColor"
//     className="bi bi-globe"
//     viewBox="0 0 16 16"
//   >
//     {/* ... SVG path data */}
//     <path
//       fillRule="evenodd"
//       d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm.5-6a.5.5 0 0 1 .5.5V9h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V10H6.5a.5.5 0 0 1 0-1H8V7.5a.5.5 0 0 1 .5-.5z"
//     />
//   </svg>
// );

// function LanguageSelector() {
//   const currentLanguageCode = cookies.get("i18next") || "en";
//   const { t, i18n } = useTranslation(); // Use the i18n instance

//   return (
//     <div className="dropdown">
//       <button
//         className="btn btn-link dropdown-toggle"
//         type="button"
//         id="dropdownMenuButton1"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//       >
//         <GlobeIcon />
//       </button>
//       <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//         <li>
//           <span className="dropdown-item-text">{t("language")}</span>
//         </li>
//         {languages.map(({ code, name, country_code }) => (
//           <li key={country_code}>
//             <a
//               href="#"
//               className={classNames("dropdown-item", {
//                 disabled: currentLanguageCode === code,
//               })}
//               onClick={() => {
//                 i18n.changeLanguage(code); // Use i18n.changeLanguage instead of i18next.changeLanguage
//               }}
//             >
//               <span
//                 className={`flag-icon flag-icon-${country_code} mx-2`}
//                 style={{
//                   opacity: currentLanguageCode === code ? 0.5 : 1,
//                 }}
//               ></span>
//               {name}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function App() {
//   const currentLanguageCode = cookies.get("i18next") || "en";
//   const currentLanguage = languages.find(l => l.code === currentLanguageCode);
//   const { t } = useTranslation();

//   useEffect(() => {
//     console.log("Setting page stuff");
//     document.body.dir = currentLanguage.dir || "ltr";
//     document.title = t("app_title");
//   }, [currentLanguage, t]);

//   return (
//     <ChakraProvider>
//       <I18nextProvider i18n={i18next}>
//         {" "}
//         {/* Wrap your app with I18nextProvider */}
//         <div className="App">
//           <Layout>
//             <Hedear />
//             <Layout>
//               <Sidebar />
//               <Content className="content">
//                 <LanguageSelector />
//                 <Routes>
//                   <Route path="/login" element={<DashboardLogin />} />
//                   <Route path="/signup" element={<DashboardSignup />} />
//                   <Route
//                     path="/users/reportAccident"
//                     element={<ContactForm />}
//                   />
//                   <Route
//                     path="/users/notification"
//                     element={<Notification />}
//                   />
//                   <Route path="/healthSafety/boards" element={<Boards />} />
//                   {/* Add more routes as needed */}
//                 </Routes>
//               </Content>
//             </Layout>
//             <Footer />
//           </Layout>
//         </div>
//       </I18nextProvider>
//     </ChakraProvider>
//   );
// }

// export default App;
