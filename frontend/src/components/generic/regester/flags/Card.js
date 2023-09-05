// src/components/CountryCard.js

import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const CountryCard = ({ name, flagUrl, language }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={name} src={flagUrl} />}
    >
      <Meta title={name} description={language} />
    </Card>
  );
};

export default CountryCard;
