import "../../assets/css/general.css";

// import { Card, Col, Row } from "antd";

// const { Meta } = Card;

// function Notification() {
//   return (
//     <>
//       <div>No any Notification.</div>
//     </>
//   );
// }

// export default Notification;

//🍉

//🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Input } from "antd";

const { Search } = Input;

const CountryGrid = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
              <Card title={country.name.common}>
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
    </div>
  );
};

export default CountryGrid;
//🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧
