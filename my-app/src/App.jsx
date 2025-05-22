import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const [category, setCategory] = useState('General');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.warning('Please enter your feedback.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/feedback`, {
        category,
        message,
      });
      toast.success('Thank you! Your feedback has been received.');
      setMessage('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background church logo */}
      <img 
        src="/assets/Rccg_logo.png" 
        alt="Church Logo" 
        className="absolute inset-0 w-full h-full object-contain opacity-10 z-0 pointer-events-none" 
      />

      <div className="relative z-10 bg-white shadow-xl rounded-2xl max-w-lg w-full p-8 animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center mb-2">🕊️ Share Your Thoughts Anonymously</h2>
        <p className="text-center text-gray-600 mb-6 italic">
          “Let all things be done decently and in order.” – 1 Corinthians 14:40
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>Worship</option>
              <option>Sermon</option>
              <option>Children</option>
              <option>Media</option>
              <option>General</option>
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Your Feedback</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              maxLength={500}
              className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Write your feedback here..."
            ></textarea>
            <p className="text-sm text-gray-500 text-right mt-1">{message.length}/500</p>
          </label>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-300 ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Your feedback helps us grow together in love.
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default FeedbackForm;
