import React, { useState, useEffect } from "react";
import { Card, Col, Row, Input } from "antd";
import "../../assets/css/general.css";
import FileTextTranslation from "../generic/textTranslationPolly/FileTextTranslation";
const { Search } = Input;

const CountryGrid = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedFlagDescription, setSelectedFlagDescription] = useState(null);

  // Create a mapping of language names to their language codes
  const languageNameToCode = {
    Spanish: "es",
    French: "fr",
    German: "de",
    // Add more languages as needed
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = query => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = countries.filter(
      country =>
        country.name.common.toLowerCase().includes(lowerCaseQuery) ||
        (country.languages &&
          Object.values(country.languages).some(lang =>
            lang.toLowerCase().includes(lowerCaseQuery)
          ))
    );
    setFilteredCountries(filtered);
    setSearchQuery(query);
  };

  const handleCountryCardClick = (language, flagDescription) => {
    setSelectedLanguage(languageNameToCode[language]); // Convert language name to code
    setSelectedFlagDescription(flagDescription);
  };

  return (
    <div className="site-card-wrapper">
      <div style={{ marginBottom: "16px" }}>
        <Search
          placeholder="Search for a country or language"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      {filteredCountries.length === 0 ? (
        <p>No matching countries found.</p>
      ) : (
        <Row gutter={16}>
          {filteredCountries.map(country => (
            <Col key={country.name.common} span={4}>
              <Card
                title={country.name.common}
                onClick={() =>
                  handleCountryCardClick(
                    country.languages[Object.keys(country.languages)[0]],
                    country.flags.alt // Pass the flag description as an argument
                  )
                }
              >
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  style={{ maxWidth: "100%" }}
                />
                <p>
                  Language:{" "}
                  {country.languages &&
                    country.languages[Object.keys(country.languages)[0]]}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {selectedFlagDescription && (
        <div style={{ padding: "2rem" }}>
          <h6 style={{ color: "black" }}>{selectedFlagDescription}</h6>
          <FileTextTranslation
            selectedLanguage={selectedLanguage}
            selectedFlagDescription={selectedFlagDescription}
          />
        </div>
      )}
    </div>
  );
};

export default CountryGrid;
