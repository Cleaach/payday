/* 

MERN: MongoDB - the database (Mongoose is how to connect to it)
      ExpressJS - the web application framework
      React - the frontend
      Node.js - the backend (Nodemon updates files automatically so you don't have to restart)

*/


// Import modules and variables
import express from "express";
import mongoose from "mongoose";
import { PORT, MongoDBURL } from "./config.js";
import { Transaction } from "./models/transaction.js"
import cors from "cors";

// Create the ExpressJS app
const app = express();

// Middleware for parsing request body (middleware = software connecting db & apps)
// I have no clue what this is for
app.use(express.json());

// CORS policy: security mechanism that looks at which domains requested data, see if it's permitted
app.use(cors())
/*app.use(cors({
    origin: 'http://localhost:5555', // Domains from which data can be requested
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'] // I don't know what headers are
}));*/

// For the home landing page
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("testing")
});

// Connect to the MongoDB database using Mongoose
mongoose
    .connect(MongoDBURL)
    .then(() => {
        console.log('Mongoose has successfully connected to the MongoDB database.')
        
        // Listen from the port in the config.js file
        app.listen(PORT, () => {
            console.log(`The app is currently listening to port ${PORT}`)
          })
    })
    .catch((error) => {
        console.log(error)
    });

// Routes can be made through app.get(), app.post(), etc., but if we have many models,
// it's bad to include all of them in index.js, so we put them in separate files in ./routes.
// Transaction routes are in ./routes/transaction
import transactionsRoute from './routes/transactions.js';
app.use('/transactions', transactionsRoute)
