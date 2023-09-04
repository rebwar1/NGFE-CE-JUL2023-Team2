import React, { Suspense } from "react";
import { createRoot } from "react-dom"; // Import createRoot from react-dom
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
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
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

const root = createRoot(document.getElementById("root")); // Use createRoot

root.render(
  <Suspense fallback={loadingMarkup}>
    <ChakraProvider>
      <CSSReset />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </Suspense>
);
