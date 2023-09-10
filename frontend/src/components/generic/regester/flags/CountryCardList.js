import React, { useState, useEffect } from "react";
import { axiosClientWithoutHeader } from "../../../../config/axios";
import axios from "axios";
import { Button, Row } from "antd";
import CountryCard from "./CountryCard";
import "./flags.css";

function CountryCardList() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClientWithoutHeader.get("/api/flag");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flag">
      <Button onClick={() => setShowCountries(true)}>
        Select Your Language
      </Button>
      {showCountries && (
        <Row gutter={16}>
          <div className="horizontal-card-container">
            {countries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        </Row>
      )}
    </div>
  );
}

export default CountryCardList;

//🍟
