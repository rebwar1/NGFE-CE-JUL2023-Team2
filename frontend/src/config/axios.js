// import axios from "axios";

// const baseURL = process.env.REACT_APP_API_URL;
// const USER_ID = 123;

// const axiosClient = axios.create({
//   baseURL,
//   headers: {
//     "x-user-id": USER_ID,
//   },
// });

// export const axiosClientWithoutHeader = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// export default axiosClient;
//! get it from html file
import axios from "axios";

// Get the apiAddress from the window object
const apiAddress = window.apiAddress;
// || "http://localhost:8181"; // Default value

const USER_ID = 123;

const axiosClient = axios.create({
  baseURL: apiAddress, // Use the apiAddress obtained from the window object or the default value
  headers: {
    "x-user-id": USER_ID,
  },
});

export const axiosClientWithoutHeader = axios.create({
  baseURL: apiAddress,
});

export default axiosClient;
