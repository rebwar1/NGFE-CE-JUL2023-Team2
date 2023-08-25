// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { ConfigProvider } from 'antd';

// import App from './components/App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//   <ConfigProvider direction="ltr">
//     <Router>
//       <App />
//     </Router>
//   </ConfigProvider>
//   // </React.StrictMode>
// );
//✅✅✅✅✅✅✅✅✅✅✅
// index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
// import { ChakraProvider, CSSReset } from "@chakra-ui/react"; // Import necessary Chakra components

// import App from "./components/App";

// ReactDOM.render(
// <ChakraProvider>
//   <CSSReset />
//   <Router>
//       <App />
//   </Router>
// </ChakraProvider>,
//   document.getElementById("root")
// );

//✅✅✅✅✅✅✅✅✅✅✅
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react"; // Import necessary Chakra components
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import "bootstrap/dist/js/bootstrap.js";

import App from "./components/App";

import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icon-css/css/flag-icon.min.css";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar", "fr"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <ChakraProvider>
      <CSSReset />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
    ,
  </Suspense>,
  document.getElementById("root")
);
