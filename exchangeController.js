// Import the Exchange model
import ExchangeModel from '../models/ExchangeModel.js';

// Controller function to handle creating exchange requests
const createExchangeRequest = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      exchangecode,
      productcode,
      exchangename,
      quantity,
      solddate,
      addeddate,
      email,
      name,
      reason,
    } = req.body;

    // Create a new exchange request using the Exchange model
    const newExchangeRequest = new ExchangeModel({
      exchangecode,
      productcode,
      exchangename,
      quantity,
      solddate,
      addeddate,
      email,
      name,
      price: 0,
      reason,
    });

    // Save the new exchange request to the database
    await newExchangeRequest.save();

    // Send a success response
    res.status(201).json({ message: 'Exchange request created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createExchangeRequest };
