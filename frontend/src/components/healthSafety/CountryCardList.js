import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, Input } from "antd";

const { Meta } = Card;
const { Search } = Input;

function CountryCardList({ onCardClick }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/flag")
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = value => {
    setSearchText(value);
    const filtered = countries.filter(
      country =>
        country.name.toLowerCase().includes(value.toLowerCase()) ||
        country.language.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCardClick = country => {
    onCardClick(country);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Search
        placeholder="Search by name or language"
        allowClear
        enterButton
        onSearch={handleSearch}
        style={{ marginBottom: "16px" }}
      />
      <List
        grid={{
          gutter: 16,
          column: 3,
        }}
        dataSource={filteredCountries}
        renderItem={country => (
          <List.Item onClick={() => handleCardClick(country)}>
            <Card
              hoverable
              style={{ cursor: "pointer", width: "150px" }}
              cover={
                <img
                  alt={country.name}
                  src={country.flag_url}
                  style={{ height: "75px", objectFit: "cover" }}
                />
              }
            >
              <Meta title={country.name} description={country.language} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default CountryCardList;
