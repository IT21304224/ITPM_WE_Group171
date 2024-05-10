import express from 'express';
import { createExchangeRequest } from '../controllers/exchangeController.js';

const router = express.Router();

// Route for creating exchange requests
router.post('/create', createExchangeRequest);

export default router;
