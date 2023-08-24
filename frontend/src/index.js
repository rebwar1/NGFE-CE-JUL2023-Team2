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
//✅
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react"; // Import necessary Chakra components

import App from "./components/App";

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <Router>
      <App />
    </Router>
  </ChakraProvider>,
  document.getElementById("root")
);
