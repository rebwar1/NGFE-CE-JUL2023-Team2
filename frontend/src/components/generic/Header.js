// import React from "react";
// import { Layout, Button, Dropdown, Space } from "antd";
// import "../../assets/scss/header.scss";

// const { Header: AntHeader } = Layout;

// export default function Header() {
//   return (
//     <div>
//       <AntHeader
//         className="header"
//         style={{ display: "flex", justifyContent: "space-between" }}
//       >
//         <img
//           src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
//           alt="NGF Logo"
//           style={{
//             width: "200px",
//             height: "40px",
//             marginTop: "auto",
//             marginBottom: "auto",
//           }}
//         />
//         {/* <div className="nav" style={{ marginLeft: "0" }}>
//         <Space direction="vertical">
//           <Space wrap>
//             <Dropdown
//               menu={{
//                 items,
//               }}
//               placement="bottomLeft"
//             >
//               <Button>Dashboard</Button>
//             </Dropdown>
//             <Dropdown
//               menu={{
//                 items,
//               }}
//               placement="bottom"
//             >
//               <Button>Users management</Button>
//             </Dropdown>
//             <Dropdown
//               menu={{
//                 items,
//               }}
//               placement="bottomRight"
//             >
//               <Button>Health and Safety</Button>
//             </Dropdown>
//           </Space>
//           <Space wrap></Space>
//         </Space>
//       </div> */}
//         <h1
//           style={{
//             color: "white",
//             marginTop: "auto",
//             marginBottom: "auto",
//             fontFamily: "'Pacifico, cursive'",
//           }}
//         >
//           Driver & Vehicle Site Safety
//         </h1>
//       </AntHeader>

//     </div>
//   );
// }

// // //🍉🍉🍉🍉🍉🍉🍉🍉
import React from "react";
import { Layout, Space } from "antd";
import "../../assets/scss/header.scss";

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <div>
      <AntHeader
        className="header"
        style={{
          display: "flex",
          height: "auto",
          justifyContent: "space-between",
          alignItems: "center", // To vertically center content
          backgroundColor: "white", // Background color for the header
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://ngfimg.s3.eu-west-2.amazonaws.com/NGF-logo.jpg"
            alt="NGF Logo"
            style={{
              width: "200px",
              height: "auto",
              // marginTop: "auto",
              // marginBottom: "auto",
            }}
          />
        </div>

        <p className="normal-text">Driver & Vehicle Site Safety</p>
      </AntHeader>

      <AntHeader
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // To vertically center content
          backgroundColor: "#279EFF", // Background color for the second header
          height: "3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="blue-text">Environment, Health & Safety (EHS)</p>
        </div>
      </AntHeader>
    </div>
  );
}
