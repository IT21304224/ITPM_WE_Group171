import express from 'express';
import { submitFeedback, getAllFeedbacks } from '../controllers/feedbackController.js';

const router = express.Router();

// Route for submitting feedback
router.post('/submit', submitFeedback);

// Route for fetching all feedbacks
router.get('/all', getAllFeedbacks);

export default router;