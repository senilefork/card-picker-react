import React, { useState, useEffect } from "react";
import axios from "axios";

const CardPicker = () => {
    const [card, setCard] = useState(null);
    const [deck, setDeck] = useState(null)

    useEffect(() => {
        async function loadDeck(){
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            //console.log(res)
            setDeck(res.data)
        };
        loadDeck();
    }, []);
    

  
    async function getCard(){
        const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
        setCard(res.data.cards[0].image)
        console.log(res.data.cards[0].image)
    };




    return(
        <div>
          <img src={card}></img>
          <button onClick={getCard}>Draw Card</button>
        </div>
    )
};

export default CardPicker;

