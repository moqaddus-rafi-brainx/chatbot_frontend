import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Send, FileText,  MessageCircle, User, Bot, Loader2, X, FileIcon } from 'lucide-react';
import { uploadDocument, processText, askQuestion } from '../../api/documentService';
import './chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [documentText, setDocumentText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [isDocumentProcessed, setIsDocumentProcessed] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file type (PDF, DOCX, or TXT)');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadedDocument(file);
    setIsLoading(true);
    setLoadingMessage('Uploading and processing your document...');

    try {
      // API call to upload and process document
      const response = await uploadDocument(file);

      // Handle the actual API response
      setIsLoading(false);
      setLoadingMessage('');
      setIsDocumentProcessed(true);
      
      // Check if the API returns a success message or use default
      const successMessage = response?.message || `Document "${file.name}" has been successfully uploaded and processed. You can now ask questions about it!`;
      
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: successMessage,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);

    } catch (error) {
      console.error('Error uploading document:', error);
      setIsLoading(false);
      setLoadingMessage('');
      setUploadedDocument(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('Error uploading document. Please try again.');
    }
  };

  const handleTextSubmit = async () => {
    if (!documentText.trim()) return;

    setIsLoading(true);
    setLoadingMessage('Processing your text...');
    setIsDocumentProcessed(true);

    try {
      // API call to process text
      const response = await processText(documentText);

      // Handle the actual API response
      setIsLoading(false);
      setLoadingMessage('');
      
      // Check if the API returns a success message or use default
      const successMessage = response?.message || 'Text has been successfully processed. You can now ask questions about it!';
      
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: successMessage,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);

    } catch (error) {
      console.error('Error processing text:', error);
      setIsLoading(false);
      setLoadingMessage('');
      alert('Error processing text. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !isDocumentProcessed) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setLoadingMessage('Analyzing your question...');

    try {
      // Simulate API call 
      const response = await askQuestion(inputText, uploadedDocument?.name || 'text-input');

      // Handle the actual API response with answer and context
      const { answer, context } = response;
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: answer,
        context: context, // Store context for potential future use
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      setLoadingMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      setLoadingMessage('');
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error while processing your question. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setUploadedDocument(null);
    setDocumentText('');
    setIsDocumentProcessed(false);
    setShowTextInput(false);
    setLoadingMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-card">
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-content">
            <div className="header-left">
              <MessageCircle size={32} />
              <div>
                <h1 className="header-title">Document Q&A Chatbot</h1>
                <p className="header-subtitle">Upload a document or paste text to start asking questions</p>
              </div>
            </div>
            {isDocumentProcessed && (
              <button
                onClick={clearChat}
                className="clear-button"
                title="Clear chat"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <Loader2 className="loading-spinner" size={32} />
              <p className="loading-text">{loadingMessage}</p>
            </div>
          </div>
        )}

        {/* Upload Section */}
        {!isDocumentProcessed && (
          <div className="upload-section">
            <div className="upload-grid">
              {/* File Upload */}
              <div>
                <h3 className="upload-section-title">
                  <Upload size={20} />
                  Upload Document
                </h3>
                <div className="file-upload-area">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="file-input"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="file-upload-button"
                    disabled={isLoading}
                  >
                    <FileIcon className="file-upload-icon" />
                    <span className="file-upload-text">
                      {isLoading ? 'Processing...' : 'Click to upload or drag and drop'}
                    </span>
                    <span className="file-upload-hint">PDF, DOC, DOCX, or TXT (max 5MB)</span>
                  </button>
                </div>
                {uploadedDocument && (
                  <div className="file-info">
                    <div className="file-info-content">
                      <div className="file-info-left">
                        <FileText size={16} />
                        <span className="file-info-name">
                          {uploadedDocument.name}
                        </span>
                      </div>
                      {isLoading && <Loader2 className="loading-spinner" size={16} />}
                    </div>
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div>
                <h3 className="upload-section-title">
                  <FileText size={20} />
                  Or Paste Text
                </h3>
                <div className="text-input-area">
                  <textarea
                    value={documentText}
                    onChange={(e) => setDocumentText(e.target.value)}
                    placeholder="Paste your text here..."
                    className="textarea"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleTextSubmit}
                    disabled={!documentText.trim() || isLoading}
                    className="primary-button full-width-button"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="loading-spinner" size={16} />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Process Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Section */}
        {isDocumentProcessed && (
          <div className="chat-section">
            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="messages-container"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.type}`}
                >
                  <div className="message-bubble">
                    <div className="message-content">
                      {message.type === 'user' ? (
                        <User className="message-icon" />
                      ) : (
                        <Bot className="message-icon" />
                      )}
                      <div className="message-text">
                        <p>{message.content}</p>
                        <p className="message-timestamp">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message bot">
                  <div className="message-bubble">
                    <div className="loading-message">
                      <Loader2 className="loading-spinner" size={16} />
                      <span>{loadingMessage}</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question about your document..."
                  className="chat-textarea"
                  rows="2"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="send-button"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
