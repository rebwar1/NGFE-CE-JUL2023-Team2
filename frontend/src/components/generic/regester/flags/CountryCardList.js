import React, { useEffect, useState } from "react";
// import axios from "axios";
import { axiosClientWithoutHeader } from "../../../../config/axios";
import { Card, List, Input } from "antd";

const { Meta } = Card;
const { Search } = Input;

function CountryCardList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axiosClientWithoutHeader
      .get("/api/flag")
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

  return (
    <div>
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
          column: 5,
        }}
        dataSource={filteredCountries}
        renderItem={country => (
          <List.Item>
            <Card
              hoverable
              style={{ cursor: "pointer", width: "200px" }}
              cover={
                <img
                  alt={country.name}
                  src={country.flag_url}
                  style={{ height: "100px", objectFit: "cover" }}
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
