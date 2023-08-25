// import React from 'react';
// import '../../assets/scss/dashboard.scss';

// export default function DashboardLogin() {
//   return (
//     <div className="dashboard">
//       <h1>LogIn in your account</h1>
//     </div>
//   );
// }
//🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉
// import React, { useState } from "react";
// import { Input, Select, Button, Spin } from "antd";
// import AWS from "aws-sdk";

// AWS.config.update({
//   region: "your-region",
//   credentials: new AWS.Credentials("your-access-key", "your-secret-key"),
// });

// const { TextArea } = Input;
// const { Option } = Select;

// const TranslateComponent = () => {
//   const [sourceText, setSourceText] = useState("");
//   const [targetLanguage, setTargetLanguage] = useState("es");
//   const [translatedText, setTranslatedText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const translateText = async () => {
//     if (!sourceText) {
//       return;
//     }

//     setLoading(true);

//     const translate = new AWS.Translate();

//     const params = {
//       Text: sourceText,
//       SourceLanguageCode: "auto",
//       TargetLanguageCode: targetLanguage,
//     };

//     try {
//       const response = await translate.translateText(params).promise();
//       setTranslatedText(response.TranslatedText);
//     } catch (error) {
//       console.error("Error translating text:", error);
//     }

//     setLoading(false);
//   };

// const getVoiceId = languageCode => {
//   switch (languageCode) {
//     case "es":
//       return "Lucia"; // Spanish voice
//     case "fr":
//       return "Celine"; // French voice
//     case "de":
//       return "Marlene"; // German voice
//     // Add more cases as needed for other languages
//     default:
//       return "Joanna"; // Default voice
//   }
// };

//   const synthesizeSpeech = async () => {
//     if (!translatedText) {
//       return;
//     }

//     setLoading(true);

//     const polly = new AWS.Polly();

//     const params = {
//       Text: translatedText,
//       OutputFormat: "mp3",
//       VoiceId: getVoiceId(targetLanguage),
//     };

//     try {
//       const response = await polly.synthesizeSpeech(params).promise();

//       const audioSrc = URL.createObjectURL(
//         new Blob([response.AudioStream], { type: "audio/mpeg" })
//       );
//       const audio = new Audio(audioSrc);
//       audio.play();
//     } catch (error) {
//       console.error("Error synthesizing speech:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="translate-container">
//       <h1>Text Translation</h1>
//       <TextArea
//         rows={5}
//         placeholder="Enter text to translate"
//         value={sourceText}
//         onChange={e => setSourceText(e.target.value)}
//       />
//       <div className="language-select">
//         <label htmlFor="targetLanguage">Target Language:</label>
//         <Select
//           id="targetLanguage"
//           value={targetLanguage}
//           onChange={value => setTargetLanguage(value)}
//         >
//           <Option value="es">Spanish</Option>
//           <Option value="fr">French</Option>
//           <Option value="de">German</Option>
//           {/* Add more language options as needed */}
//         </Select>
//       </div>
//       <Button type="primary" onClick={translateText} disabled={loading}>
//         Translate
//       </Button>
//       <Button onClick={synthesizeSpeech} disabled={loading || !translatedText}>
//         Synthesize Speech
//       </Button>
//       {loading && <Spin className="loading-spinner" />}
//       {translatedText && (
//         <div className="translated-text">
//           <h2>Translated Text:</h2>
//           <p>{translatedText}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TranslateComponent;
//🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉
import React, { useState } from "react";
import { Input, Select, Button, Spin } from "antd";
import AWS from "aws-sdk";

AWS.config.update({
  region: "your-region",
  credentials: new AWS.Credentials("your-access-key", "your-secret-key"),
});

const { TextArea } = Input;
const { Option } = Select;

const TranslateComponent = () => {
  const [sourceText, setSourceText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async e => {
    const file = e.target.files[0];

    if (file) {
      try {
        const fileContent = await file.text();
        const jsonData = JSON.parse(fileContent);

        if (jsonData && jsonData.text) {
          setSourceText(jsonData.text);
        }
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
    }
  };

  const translateText = async () => {
    if (!sourceText) {
      return;
    }

    setLoading(true);

    const translate = new AWS.Translate();

    const params = {
      Text: sourceText,
      SourceLanguageCode: "auto",
      TargetLanguageCode: targetLanguage,
    };

    try {
      const response = await translate.translateText(params).promise();
      setTranslatedText(response.TranslatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }

    setLoading(false);
  };

  const getVoiceId = languageCode => {
    switch (languageCode) {
      case "es":
        return "Lucia"; // Spanish voice
      case "fr":
        return "Celine"; // French voice
      case "de":
        return "Marlene"; // German voice
      // Add more cases as needed for other languages
      default:
        return "Joanna"; // Default voice
    }
  };

  const synthesizeSpeech = async () => {
    if (!translatedText) {
      return;
    }

    setLoading(true);

    const polly = new AWS.Polly();

    const params = {
      Text: translatedText,
      OutputFormat: "mp3",
      VoiceId: getVoiceId(targetLanguage),
    };

    try {
      const response = await polly.synthesizeSpeech(params).promise();

      const audioSrc = URL.createObjectURL(
        new Blob([response.AudioStream], { type: "audio/mpeg" })
      );
      const audio = new Audio(audioSrc);
      audio.play();
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }

    setLoading(false);
  };

  return (
    <div className="translate-container">
      <h1>Text Translation</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <div className="language-select">
        <label htmlFor="targetLanguage">Target Language:</label>
        <Select // Using the Select component from antd
          id="targetLanguage"
          value={targetLanguage}
          onChange={value => setTargetLanguage(value)}
        >
          <Option value="es">Spanish</Option>
          <Option value="fr">French</Option>
          <Option value="de">German</Option>
          {/* Add more language options as needed */}
        </Select>
      </div>
      <Button type="primary" onClick={translateText} disabled={loading}>
        Translate
      </Button>
      <Button onClick={synthesizeSpeech} disabled={loading || !translatedText}>
        Synthesize Speech
      </Button>
      {loading && <Spin className="loading-spinner" />}
      {translatedText && (
        <div className="translated-text">
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateComponent;
