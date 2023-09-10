// import React, { useState } from "react";
// import { Form, Input, Button, message } from "antd";
// import axios from "axios"; // Import axios for making API requests

// const Signature = ({ userData }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async values => {
//     setLoading(true);

//     try {
//       // Make a POST request to the 'signature' endpoint with the form data
//       const response = await axios.post("/signature", {
//         ...values,
//         ...userData, // Include data from the 'Posts' form
//       });

//       if (response.status === 200) {
//         console.log("Signature data saved successfully!");
//         message.success("Signature data saved successfully!");
//       } else {
//         console.error("Error: Unable to save signature data.");
//         message.error(
//           "Error: Unable to save signature data. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       message.error(
//         "Error: Unable to save signature data. Please try again later."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form form={form} onFinish={onFinish}>
//       <Form.Item
//         label="Name"
//         name="name"
//         initialValue={userData.name} // Set initial value from 'userData'
//         rules={[
//           {
//             required: true,
//             message: "Please enter your name",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Email"
//         name="email"
//         initialValue={userData.email} // Set initial value from 'userData'
//         rules={[
//           {
//             required: true,
//             message: "Please enter your email",
//             type: "email",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Company Name"
//         name="companyName"
//         initialValue={userData.companyName} // Set initial value from 'userData'
//         rules={[
//           {
//             required: true,
//             message: "Please enter your company name",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit" loading={loading}>
//           Save Signature
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default Signature;

// 🍉
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
// import axios from "axios"; // Import axios for making API requests
import { axiosClientWithoutHeader } from "../../../config/axios";

const Signature = ({ userData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);

    try {
      // Make a POST request to the '/signature' endpoint with the form data
      const response = await axiosClientWithoutHeader.post("/signature", {
        name: values.name,
        email: values.email,
        company: values.company,
      });

      if (response.status === 200) {
        console.log("Signature data saved successfully!");
        message.success("Signature data saved successfully!");
      } else {
        console.error("Error: Unable to save signature data.");
        message.error(
          "Error: Unable to save signature data. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(
        "Error: Unable to save signature data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        initialValue={userData.name} // Set initial value from 'userData'
        rules={[
          {
            required: true,
            message: "Please enter your name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        initialValue={userData.email} // Set initial value from 'userData'
        rules={[
          {
            required: true,
            message: "Please enter your email",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Company Name"
        name="company"
        initialValue={userData.companyName} // Set initial value from 'userData'
        rules={[
          {
            required: true,
            message: "Please enter your company name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save Signature
        </Button>
      </Form.Item>
    </Form>
  );
};

// https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=56949c87-4fae-4c91-893c-d512df949d24&redirect_uri=http://localhost:8000/

export default Signature;
