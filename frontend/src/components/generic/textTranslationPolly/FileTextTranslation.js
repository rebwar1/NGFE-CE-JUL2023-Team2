import React, { useState, useEffect } from "react";
import { Select, Button, Spin } from "antd";
import AWS from "./Credentials";

const { Option } = Select;

const FileTextTranslation = ({ selectedLanguage, selectedFlagDescription }) => {
  const [targetLanguage, setTargetLanguage] = useState(selectedLanguage);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTargetLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const translateText = async () => {
    setLoading(true);

    const translate = new AWS.Translate();

    const params = {
      Text: selectedFlagDescription,
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

  const synthesizeSpeech = async () => {
    if (!translatedText && !selectedFlagDescription) {
      return;
    }

    setLoading(true);

    const polly = new AWS.Polly();

    const textToSynthesize = translatedText || selectedFlagDescription;

    const params = {
      Text: textToSynthesize,
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

  return (
    <div className="translate-container">
      <h1>Text Translation REBWAR</h1>
      <div className="language-select">
        <label htmlFor="targetLanguage">Target Language:</label>
        <Select
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
        <div className="translated-text" style={{ color: "black" }}>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default FileTextTranslation;
