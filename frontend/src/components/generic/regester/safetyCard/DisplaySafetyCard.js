import { axiosClientWithoutHeader } from "../../../../config/axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
// import axios from "axios";

const DisplaySafetyCard = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    // Fetch card data from the Express API using Axios
    axiosClientWithoutHeader
      .get("/safety/card")
      .then(response => setCards(response.data))
      .catch(error => console.error(error));
  }, []);

  const nextCard = () => {
    setCurrentCardIndex(prevIndex => (prevIndex + 1) % cards.length);
  };

  return (
    <div>
      {cards.length > 0 && (
        <Card
          style={{ width: 300 }}
          cover={<img alt="Card" src={cards[currentCardIndex].image_url} />}
        >
          <p>{cards[currentCardIndex].description}</p>
        </Card>
      )}
      <Button onClick={nextCard} style={{ marginTop: 16 }}>
        Next Card
      </Button>
    </div>
  );
};

export default DisplaySafetyCard;
