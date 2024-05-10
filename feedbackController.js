import Feedback from '../models/feedbackModel.js';
// Controller to submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const { name, feedback } = req.body;
    const newFeedback = await Feedback.create({ name, feedback });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to get all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};