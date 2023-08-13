var dealerSum = 0;
var yourSum = 0;
var dealerAce = 0;
var yourAce = 0;
var hidden;
var deck
var canHit = true;

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

//Creating a deck of 52 cards from all values and suits
function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    deck = [];

    for(let i = 0 ; i < 4 ; i++){
        for(let j = 0 ; j < 13 ; j++){
            deck.push(values[j] + "-" + suits[i]);
        }
    }
}

//Randomly swaping each of the 52 cards with another card in the deck created to simulate shuffling
function shuffleDeck(){
    for(let i = 0 ; i < 52 ; i++){
        let j = Math.floor(Math.random()*52);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame(){
    let card;
    let cardImg;
    //setting dealer's hidden card
    hidden = deck.pop();
    dealerSum += cardValue(hidden);
    dealerAce += checkAce(hidden);
    //dealer draws 1st card and displays it
    card = deck.pop();
    dealerSum += cardValue(card);
    dealerAce += checkAce(card);
    cardImg = document.createElement("img");
    cardImg.src = "./cards/" + card + ".png";
    document.getElementById("DealerCards").append(cardImg);
    document.getElementById("DealerSum").innerText = dealerSum -cardValue(hidden);
    
    //next 2 cards dealt are the player's cards
    for(let i = 0 ; i < 2 ; i++){
        card = deck.pop();
        yourSum += cardValue(card);
        yourAce += checkAce(card);
        cardImg = document.createElement("img");
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("YourCards").append(cardImg);
    }
    document.getElementById("YourSum").innerText = yourSum;

    document.getElementById("hit_btn").addEventListener("click" , hit);
    document.getElementById("stand_btn").addEventListener("click", stand);
}

function hit(){
    if(!canHit){
        return;
    }
    
    let card = deck.pop();
    yourSum += cardValue(card);
    yourAce += checkAce(card);
    let cardImg = document.createElement("img");
    cardImg.src = "./cards/" + card + ".png";
    document.getElementById("YourCards").append(cardImg);
    yourScore();

    if(yourSum >= 21){
        stand();
    }
}

function dealerHit(){
    while(dealerSum < 17){
        let card = deck.pop();
        dealerSum += cardValue(card);
        dealerAce += checkAce(card);
        let cardImg = document.createElement("img");
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("DealerCards").append(cardImg);
    }
    document.getElementById("DealerSum").innerText = dealerSum;
}

function stand(){
    dealerHit();
    dealerSum = reduceAce(dealerSum, dealerAce);
    yourSum = reduceAce(yourSum, yourAce);
    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    let message;
    if(yourSum > 21){
        message = "You Lose";
    }
    else if(dealerSum > 21){
        message = "You Win";
    }
    else if(yourSum == dealerSum){
        message = "Tie";
    }
    else if(yourSum > dealerSum){
        message = "You Win";
    }
    else if(yourSum < dealerSum){
        message = "You Lose";
    }
    document.getElementById("result").innerText = message;

    document.getElementById("hit_btn").addEventListener("click" , refresh);
    document.getElementById("stand_btn").addEventListener("click", refresh);
}

function cardValue(card){
    let data = card.split("-");
    let value = data[0];
    if(isNaN(value)){
        if(value == "A"){
            return 11;
        }
        else{
            return 10;
        }
    }
    else{
        return parseInt(value);
    }
}

function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
    else{
        return 0;
    }
}

function reduceAce(sum, aceCount){
    while(sum > 21 && aceCount > 0){
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}

function yourScore(){
    document.getElementById("YourSum").innerText = reduceAce(yourSum, yourAce);
}

function refresh(){
    location.reload();
}