import 'dotenv/config'
import express, { json } from "express"
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 5000

// app.get("/", (req, res)=> {
//     res.send("Hello from shravani!!")
// })

// app.get("/tejas", (req, res)=> {
//     res.send("Hello tejas!!")
// })

app.use(express.json())

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


const coffeeData = []
let nextId = 1

// add a new coffee
app.post("/coffees", (req, res) => {
  logger.info("Its a post request nade ti add a new coffee")
  const {coffee_name, price} = req.body
    const newCoffee = {id: nextId++, coffee_name, price}
    coffeeData.push(newCoffee)
    res.status(201).send(newCoffee)
})

// get all coffee
app.get("/coffees", (req, res) => {
    res.status(200).send(coffeeData)
})

// get a coffee with id
app.get("/coffees/:id", (req, res) => {
    const coffee = coffeeData.find(c => c.id === parseInt(req.params.id));
    if(!coffee) {
        return res.status(404).send("Coffee not found")
    }
    res.status(200).send(coffee);
})

// update coffee
app.put('/coffees/:id', (req, res) => {
    const coffee = coffeeData.find(t => t.id === parseInt(req.params.id))
    if(!coffee){
        return res.status(404).send("Coffee not found")
    }

    const {coffee_name, price} = req.body
    coffee.coffee_name = coffee_name
    coffee.price = price
    res.status(200).send(coffee)
})


// delete Coffee
app.delete('/coffees/:id', (req, res) => {
    const Index = coffeeData.findIndex(t => t.id === parseInt(req.params.id))
    if(Index === -1){
        return res.status(404).send("Coffee not found")
    }
    coffeeData.splice(Index, 1)
    res.status(204).send("Deleted!")

})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})