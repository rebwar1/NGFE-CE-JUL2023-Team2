import React, { useState, useEffect } from "react";
import { Card, Button, Spin, Select } from "antd";
import { axiosClientWithoutHeader } from "../../config/axios";
import AWS from "../generic/textTranslationPolly/Credentials";
import { AudioOutlined, StepForwardOutlined } from "@ant-design/icons";
import "./SafetyCards.css";

const { Option } = Select;

const DisplaySafetyCard = ({
  selectedCountry,
  displayPrint,
  setShowSafetyCardMessage,
}) => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [showAllCards, setShowAllCards] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);

  const [voice, setVoice] = useState("");
  const [tld, setTld] = useState(null);
  const [selectLanguage, setSelectLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState(tld);
  const [country, setCountry] = useState(null);

  const languageNameToCode = {
    Spanish: "es",
    French: "fr",
    German: "de",
    Persian: "fa",
    Korean: "ko",
    English: "en",
    Arabic: "ar",
    Kurdish: "ku",
    // Add more languages as needed
  };

  const getVoiceId = () => {
    let selectedVoice = "Celine"; // Default voice

    switch (tld) {
      case "es":
        selectedVoice = "Lucia"; // Spanish voice
        break;
      case "fr":
        selectedVoice = "Celine"; // French voice
        break;
      case "de":
        selectedVoice = "Marlene"; // German voice
        break;
      case "fa":
        selectedVoice = "Dari"; // Persian voice
        break;
      case "ko":
        selectedVoice = "Seoyeon"; // Korean voice
        break;
      case "en":
        selectedVoice = "Emma"; // English voice
        break;
      case "ar":
        selectedVoice = "Hala"; // Arabic voice
        break;
      case "ku":
        selectedVoice = "Zayd"; // Kurdish voice
        break;
      default:
        break;
    }

    // Set the target language based on the selected TLD
    setTargetLanguage(tld);
    setVoice(selectedVoice);

    return selectedVoice;
  };

  useEffect(() => {
    axiosClientWithoutHeader
      .get("/safety/card")
      .then(response => {
        console.log("API Response:", response.data);
        setCards(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const nextCard = async () => {
    if (displayedCards.length === cards.length - 1) {
      setShowAllCards(true);
      setShowSafetyCardMessage(true);
    } else {
      const newIndex = findNextCardIndex();
      setDisplayedCards([...displayedCards, newIndex]);
      setCurrentCardIndex(newIndex);

      // Get the target language code from the selected language name
      const targetLanguageCode = languageNameToCode[selectLanguage];

      await translateAndSetCardDescription(
        cards[newIndex].description,
        targetLanguageCode
      );
    }
  };

  const findNextCardIndex = () => {
    let newIndex = currentCardIndex;
    do {
      newIndex = (newIndex + 1) % cards.length;
    } while (displayedCards.includes(newIndex));
    return newIndex;
  };

  const translateAndSetCardDescription = async (
    description,
    targetLanguageCode
  ) => {
    setLoading(true);
    const translate = new AWS.Translate();
    const params = {
      Text: description,
      SourceLanguageCode: "auto",
      TargetLanguageCode: targetLanguageCode,
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

    // Convert the selected language name to language code
    const targetLanguageCode = languageNameToCode[selectLanguage];

    await translateAndSetCardDescription(
      cards[currentCardIndex].description,
      targetLanguageCode
    );
    setLoading(false);
    setLanguageSelected(true);
  };

  const handleSpeechSynthesis = async () => {
    const targetLanguageCode = languageNameToCode[selectLanguage];
    if (!translatedText && !loading) {
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

  useEffect(() => {
    if (selectedCountry) {
      console.log("Selected Country:", selectedCountry);
      setTld(selectedCountry.tld);
      setSelectLanguage(selectedCountry.language);
      setVoice(selectedCountry.voice);
      setCountry(selectedCountry.flag_url);
      // You can access selectedCountry data here and use it as needed.
    }
  }, [selectedCountry]);

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
              <Button onClick={handleTranslate} disabled={loading}>
                Translate
              </Button>
            </>
          )}
          {languageSelected && (
            <>
              <div className="icon-container">
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
          <div className="flag-container">
            <img src={country} alt="German Flag" className="flag-image" />
          </div>
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

//🍇
