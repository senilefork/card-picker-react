import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const TimedCardPicker = () => {

    const [card, setCard] = useState(null);
    const [deck, setDeck] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const timeRef = useReducer(null);

    useEffect(() => {
        async function loadDeck(){
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            //console.log(res)
            setDeck(res.data)
        };
        loadDeck();
        console.log(deck)
    }, []);



    useEffect(() => {
        async function getCard(){
            
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
            setCard(res.data.cards[0].image)
        };

        if(isStarted && !timeRef.current){
            timeRef.current = setInterval(async () => {
                await getCard()
            },1000)
        } 
        
        return () => {
            clearInterval(timeRef.current);
            timeRef.current = null
        }
        

    }, [isStarted])

    const start = () => {
        setIsStarted((isStarted) => {
         return !isStarted 
        })
    }

    return(
    <div>
      <img src={card}></img>
      <button onClick={start}>Start</button>
    </div>
    )

}
export default TimedCardPicker;

