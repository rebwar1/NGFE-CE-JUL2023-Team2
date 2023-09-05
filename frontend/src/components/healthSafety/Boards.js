// import { axiosClientWithoutHeader } from "../../config/axios";
// import React, { useState, useEffect } from "react";
// import { Card, Button } from "antd";

// const DisplaySafetyCard = () => {
//   const [cards, setCards] = useState([]);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);

//   useEffect(() => {
//     // Fetch card data from the Express API using Axios
//     axiosClientWithoutHeader
//       .get("/safety/card")
//       .then(response => {
//         console.log("API Response:", response.data); // Debugging: Log the API response
//         setCards(response.data);
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const nextCard = () => {
//     setCurrentCardIndex(prevIndex => (prevIndex + 1) % cards.length);
//   };

//   return (
//     <div>
//       {cards.length > 0 && (
//         <Card
//           style={{ width: 300 }}
//           cover={<img alt="Card" src={cards[currentCardIndex].image_url} />}
//         >
//           <p>{cards[currentCardIndex].description}</p>
//         </Card>
//       )}
//       <Button onClick={nextCard} style={{ marginTop: 16 }}>
//         Next Card
//       </Button>
//     </div>
//   );
// };

// export default DisplaySafetyCard;

//🍒
// import { axiosClientWithoutHeader } from "../../config/axios";
// import React, { useState, useEffect } from "react";
// import { Card, Button } from "antd";

// const DisplaySafetyCard = displyPrint => {
//   const [cards, setCards] = useState([]);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);
//   const [displayedCards, setDisplayedCards] = useState([]);
//   const [showAllCards, setShowAllCards] = useState(false);

//   useEffect(() => {
//     // Fetch card data from the Express API using Axios
//     axiosClientWithoutHeader
//       .get("/safety/card")
//       .then(response => {
//         console.log("API Response:", response.data); // Debugging: Log the API response
//         setCards(response.data);
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const nextCard = () => {
//     if (displayedCards.length === cards.length - 1) {
//       // All cards have been displayed
//       setShowAllCards(true);
//     } else {
//       setCurrentCardIndex(prevIndex => {
//         let newIndex = prevIndex;
//         console.log("newIndex", newIndex);
//         do {
//           newIndex = (newIndex + 1) % cards.length;
//         } while (displayedCards.includes(newIndex));
//         setDisplayedCards([...displayedCards, newIndex]);
//         return newIndex;
//       });
//     }
//   };

//   return (
//     <div>
//       {cards.length > 0 && (
//         <Card
//           style={{ width: 300 }}
//           cover={<img alt="Card" src={cards[currentCardIndex].image_url} />}
//         >
//           <p>{cards[currentCardIndex].description}</p>
//         </Card>
//       )}
//       {!showAllCards && (
//         <Button onClick={nextCard} style={{ marginTop: 16 }}>
//           Next Card
//         </Button>
//       )}
//       {(displyPrint = showAllCards)}
//       {showAllCards && <p>All cards have been displayed</p>}
//     </div>
//   );
// };

// export default DisplaySafetyCard;

//🍒
import { axiosClientWithoutHeader } from "../../config/axios";
import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";

const DisplaySafetyCard = ({ displyPrint, setShowSafetyCardMessage }) => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [showAllCards, setShowAllCards] = useState(false);

  useEffect(() => {
    // Fetch card data from the Express API using Axios
    axiosClientWithoutHeader
      .get("/safety/card")
      .then(response => {
        console.log("API Response:", response.data); // Debugging: Log the API response
        setCards(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const nextCard = () => {
    if (displayedCards.length === cards.length - 1) {
      // All cards have been displayed
      setShowAllCards(true);
    } else {
      setCurrentCardIndex(prevIndex => {
        let newIndex = prevIndex;
        console.log("newIndex", newIndex);
        do {
          newIndex = (newIndex + 1) % cards.length;
        } while (displayedCards.includes(newIndex));
        setDisplayedCards([...displayedCards, newIndex]);
        return newIndex;
      });
    }
  };

  if (showAllCards) {
    // When all cards have been displayed, update the state in the Posts component
    setShowSafetyCardMessage(true);
  }

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
      {!showAllCards && (
        <Button onClick={nextCard} style={{ marginTop: 16 }}>
          Next Card
        </Button>
      )}
      {(displyPrint = showAllCards)}
      {showAllCards && <p>All cards have been displayed</p>}
    </div>
  );
};

export default DisplaySafetyCard;
