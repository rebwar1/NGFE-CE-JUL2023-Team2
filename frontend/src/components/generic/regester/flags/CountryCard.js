import React from "react";
import { Card } from "antd";

const CountryCard = ({ country }) => {
  return (
    <Card
      style={{ width: 300, margin: "16px" }}
      cover={<img alt={country.name_common} src={country.flag_url} />}
    >
      <h2>{country.name_common}</h2>
      <p>Language: {country.language}</p>
    </Card>
  );
};

export default CountryCard;

//🍔
