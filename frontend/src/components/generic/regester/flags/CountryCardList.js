// src/components/CountryCardList.js

import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
// import axios from "axios";
import { axiosClientWithoutHeader } from "../../../../config/axios";
import CountryCard from "./CountryCard";

const CountryCardList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClientWithoutHeader.get("/api/flag").then(response => {
      setData(response.data);
    });
  }, []);

  return (
    <Row gutter={16}>
      {data.map(country => (
        <Col span={5} key={country.name_common}>
          <CountryCard
            name={country.name_common}
            flagUrl={country.flag_url}
            language={country.language}
          />
        </Col>
      ))}
    </Row>
  );
};

export default CountryCardList;
