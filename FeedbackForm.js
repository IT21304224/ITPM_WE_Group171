import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/feedback/submit', { name, feedback });
      toast.success('Feedback submitted successfully!');
      setName('');
      setFeedback('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={styles.inputField}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your Feedback"
            style={styles.textareaField}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '450px',
    margin: '0 auto',
    padding: '5px',
    backgroundColor: '#333',
    borderRadius: '8px',
  },
  title: {
    marginBottom: '15px',
    textAlign: 'center',
    color: '#fff',
    fontSize: '18px',
  },
  inputGroup: {
    marginBottom: '5px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #666',
    backgroundColor: '#444',
    color: '#fff',
    boxSizing: 'border-box',
    outline: 'none',
  },
  textareaField: {
    width: '100%',
    padding: '5px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #666',
    backgroundColor: '#444',
    color: '#fff',
    boxSizing: 'border-box',
    minHeight: '80px',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '6px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    outline: 'none',
  },
};

export default FeedbackForm;
