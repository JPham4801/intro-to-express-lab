const express = require('express');

const app = express();
const PORT = 3000;

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/greetings/:name', (req, res, next) => {
  res.send(`<h1>Hey ${req.params.name}! Lovely day isn't it?</h1>`)
});

app.get('/roll/:diceNumber', (req, res, next) =>{
  let diceNumber = req.params.diceNumber;

  if(isNaN(diceNumber)){
    res.send('<h1>You must specify a number.</h1>')
  } else {
    const randomRoll = Math.floor(Math.random() * (diceNumber))
    res.send(`<h1>You rolled a ${randomRoll}</h1>`)
  }
});

app.get('/collectibles/:itemIdx', (req, res, next) =>{
  let itemIdx = req.params.itemIdx;

  if(itemIdx >= (collectibles.length)){
    res.send("This item is not yet in stock. Check back soon!")
  } else {
    res.send(`So you want the ${collectibles[itemIdx].name}? For $${collectibles[itemIdx].price}, it can be yours!`)
  }
});

app.get('/shoes', (req, res) => {
  let min = `${req.query['min-price']}`
  let max = `${req.query['max-price']}`
  let typeOfShoe = req.query['type']

  if(!isNaN(min)){
    res.send(`${JSON.stringify(shoes.filter((shoe) => shoe.price > min))}`)
  } else if(!isNaN(max)){
    res.send(`${JSON.stringify(shoes.filter((shoe) => shoe.price < max))}`)
  } else if(typeof typeOfShoe === "string"){
    res.send(`${JSON.stringify(shoes.filter((shoe) => shoe.type === typeOfShoe))}`)
  } else {
    res.send(`${JSON.stringify(shoes)}`)
  }
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});