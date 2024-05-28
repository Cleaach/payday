import express from "express";
import { Transaction } from '../models/transaction.js';

const router = express.Router();

// Create new transactions by POSTing a JSON object to /transactions
router.post('/', async (request, response) => { 
    try {
        // Make sure the required field is filled, if not, error 400
        if ( !request.body.amount ) { return response.status(400).send({message: 'Please input the transaction amount.'})}
        
        // Make a new transaction
        const newTransaction = {
            amount: request.body.amount,
            category: request.body.category,
            description: request.body.description,
            user: "Clement",
            date: request.body.date
        }

        // Create the transaction object using the .create() method
        const transactionObj = await Transaction.create(newTransaction); // Note: need to use async to use await

        return response.status(201).send(transactionObj)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// GET all transactions at /transactions 
router.get('/', async (request, response) => {
    try {
        const transactions = await Transaction.find({})
        return response.status(200).json({
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// GET one transaction from the database
router.get('/:id', async (request, response) => {
    try {
        
        // Extract the id parameter from the URL, for example id is 42 if at /transactions/42
        // request.params is the parameters from the URL
        // { id } and not id because it is a property in params and not the entire params
        const { id } = request.params;

        // Find and send
        const transaction = await Transaction.findById(id);
        return response.status(200).json(transaction);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Update a transaction
router.put('/:id', async (request, response) => {
    try {
        // Make sure required field is filled (same as creating a new transaction)
        if ( !request.body.amount ) { return response.status(400).send({message: 'Please input the transaction amount.'})}

        const { id } = request.params;
        const result = await Transaction.findByIdAndUpdate(id, request.body);
        
        // Success or not found
        if (!result) { return response.status(404).json({ message: "Transaction not found" })} // Why .json() and not .send()? I don't know
        return response.status(200).send({ message: "Updated successfully "})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

// Delete a transaction from the database
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Transaction.findByIdAndDelete(id);
        if (!result) { return response.status(404).json({ message: "Transaction not found" })} // Why .json() and not .send()? I don't know
        return response.status(200).send({ message: "Deleted successfully "})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

export default router;