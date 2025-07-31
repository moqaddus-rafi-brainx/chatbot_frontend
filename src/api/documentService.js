import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Upload and process document
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Process text input
export const processText = async (text) => {
  const response = await axios.post(`${BASE_URL}/process-text`, {
    text: text
  });

  return response.data;
};

// Ask question about document
export const askQuestion = async (question, documentId) => {
  const response = await axios.post(`${BASE_URL}/ask`, {
    question: question,
    documentId: documentId
  });

  return response.data;
}; 