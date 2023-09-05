import React, { useState } from "react";

const Signature = () => {
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState("");

  const handleSign = () => {
    // Implement your signature logic here, e.g., capturing the user's name
    // Once the user signs, set the signed state to true
    setSigned(true);
  };

  return (
    <div>
      <h2>Signature</h2>
      {!signed ? (
        <>
          <p>Please print your name to agree:</p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
          />
          <button onClick={handleSign}>Sign</button>
        </>
      ) : (
        <p>Thank you, {name}! You have agreed.</p>
      )}
      {/* Add your signature content and logic here */}
    </div>
  );
};

export default Signature;
