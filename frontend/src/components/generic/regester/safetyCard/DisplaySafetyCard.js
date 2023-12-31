import React, { useState, useEffect } from "react";
import { Card, Button, Spin, Select } from "antd";
import { axiosClientWithoutHeader } from "../../../../config/axios";
import AWS from "../../textTranslationPolly/Credentials";

import { AudioOutlined, StepForwardOutlined } from "@ant-design/icons";
import "./SafetyCards.css";

const { Option } = Select;

const DisplaySafetyCard = ({ displyPrint, setShowSafetyCardMessage }) => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [showAllCards, setShowAllCards] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("es"); // Default language
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false); // New state variable

  const getVoiceId = languageCode => {
    switch (languageCode) {
      case "es":
        return "Lucia"; // Spanish voice
      case "fr":
        return "Celine"; // French voice
      case "de":
        return "Marlene"; // German voice
      // Add more cases as needed for other languages
      case "fa":
        return "Dari"; // Persian voice
      case "ko":
        return "Seoyeon, Female"; // Kurdish voice
      default:
        return "Joanna"; // Default voice
    }
  };

  useEffect(() => {
    // Fetch card data from the Express API using Axios
    axiosClientWithoutHeader
      .get("/safety/card")
      .then(response => {
        console.log("API Response:", response.data); // Debugging: Log the API response
        setCards(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const nextCard = async () => {
    if (displayedCards.length === cards.length - 1) {
      // All cards have been displayed
      setShowAllCards(true);
      setShowSafetyCardMessage(true);
    } else {
      const newIndex = findNextCardIndex();
      setDisplayedCards([...displayedCards, newIndex]);
      setCurrentCardIndex(newIndex);
      await translateAndSetCardDescription(cards[newIndex].description);
    }
  };

  const findNextCardIndex = () => {
    let newIndex = currentCardIndex;
    do {
      newIndex = (newIndex + 1) % cards.length;
    } while (displayedCards.includes(newIndex));
    return newIndex;
  };

  const translateAndSetCardDescription = async description => {
    setLoading(true);

    const translate = new AWS.Translate();

    const params = {
      Text: description,
      SourceLanguageCode: "auto",
      TargetLanguageCode: targetLanguage,
    };

    try {
      const response = await translate.translateText(params).promise();
      let translatedDescription = response.TranslatedText;

      translatedDescription = translatedDescription.replace(
        /Concept «|panneau | » | Please Stop smoking » \(« , «/g,
        ""
      );

      setTranslatedText(translatedDescription);
    } catch (error) {
      console.error("Error translating text:", error);
    }

    setLoading(false);
  };

  const handleTranslate = async () => {
    if (!cards[currentCardIndex].description) {
      return;
    }

    setLoading(true);

    await translateAndSetCardDescription(cards[currentCardIndex].description);

    setLoading(false);

    // Set languageSelected to true after translation
    setLanguageSelected(true);
  };

  const handleSpeechSynthesis = async () => {
    if (!translatedText && !loading) {
      return;
    }

    setLoading(true);

    const polly = new AWS.Polly();

    const params = {
      Text: translatedText,
      OutputFormat: "mp3",
      VoiceId: getVoiceId(targetLanguage), // Use getVoiceId to select the voice.
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
    <div className="container">
      {cards.length > 0 && (
        <Card
          style={{ width: 400, marginBottom: "0.5rem" }}
          cover={<img alt="Card" src={cards[currentCardIndex].image_url} />}
        >
          <p>{cards[currentCardIndex].description}</p>
          {!languageSelected && (
            <>
              <Select
                style={{ width: 120 }}
                value={targetLanguage}
                onChange={value => setTargetLanguage(value)}
              >
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
                <Option value="de">German</Option>
                <Option value="fa">Persian</Option>
                <Option value="ko">Korean</Option>
              </Select>
              <Button onClick={handleTranslate} disabled={loading}>
                Translate
              </Button>
            </>
          )}
          {languageSelected && (
            <>
              <div className="icon-container">
                {" "}
                {/* Wrapping icons in a div */}
                <Button
                  className="icon-button audio-button"
                  onClick={handleSpeechSynthesis}
                  disabled={!translatedText || loading}
                >
                  <div className="center-icon">
                    <AudioOutlined />
                  </div>
                </Button>
                <div>{loading && <Spin className="loading-spinner" />}</div>
              </div>
            </>
          )}
          {translatedText && (
            <div className="translated-text" style={{ color: "black" }}>
              <h5 className="text-h5">{translatedText}</h5>
            </div>
          )}
        </Card>
      )}
      {!showAllCards && (
        <div className="center-button">
          <Button onClick={nextCard} className="icon-button">
            <div className="center-icon">
              <StepForwardOutlined />
            </div>
          </Button>
        </div>
      )}
      {showAllCards && <p>All cards have been displayed</p>}
    </div>
  );
};

export default DisplaySafetyCard;
//✅✅✅✅✅✅✅✅
