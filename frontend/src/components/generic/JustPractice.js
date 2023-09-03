import React, { useState } from "react";

function JustPractice() {
  // Define state variables for form fields
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Define a function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Create a data object to send to the backend
    const formData = {
      name,
      familyName,
      email,
      vehicleNumber,
      companyName,
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "), // Format the timestamp
    };

    // Display formData in the console for debugging
    console.log("Form Data:", formData);

    // Send a POST request to your backend
    try {
      const response = await fetch("http://localhost:4000/save-check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Display response in the console for debugging
      console.log("Response:", response);

      if (response.ok) {
        // Reset the form fields upon successful submission
        setName("");
        setFamilyName("");
        setEmail("");
        setVehicleNumber("");
        setCompanyName("");
        alert("Check-in saved successfully!");
      } else {
        alert("Error: Unable to save check-in.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Unable to save check-in. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Create a New Check-In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="familyName">Family Name:</label>
          <input
            type="text"
            id="familyName"
            value={familyName}
            onChange={e => setFamilyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="vehicleNumber">Vehicle Number:</label>
          <input
            type="text"
            id="vehicleNumber"
            value={vehicleNumber}
            onChange={e => setVehicleNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

//🌧
