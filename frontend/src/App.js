import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerateReply = async () => {
    if (!emailContent.trim()) {
      alert('Please enter an email to generate a reply');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/email/generate', {
        emailContent: emailContent,
        tone: tone
      });
      setGeneratedReply(response.data);
    } catch (error) {
      console.error('Error generating reply:', error);
      alert('Failed to generate reply. Please make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyReply = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📧 Email Reply Generator</h1>
          <p>Generate professional email replies instantly</p>
        </header>

        <div className="input-section">
          <div className="form-group">
            <label htmlFor="emailContent">Original Email Content:</label>
            <textarea
              id="emailContent"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste the original email content here..."
              rows="8"
              className="email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tone">Reply Tone:</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="tone-select"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <button
            onClick={handleGenerateReply}
            disabled={isLoading}
            className="generate-btn"
          >
            {isLoading ? '⚡ Generating...' : '📝 Generate Reply'}
          </button>
        </div>

        {generatedReply && (
          <div className="reply-section">
            <div className="reply-header">
              <h3>Generated Reply:</h3>
              <button
                onClick={handleCopyReply}
                className={`copy-btn ${copySuccess ? 'success' : ''}`}
              >
                {copySuccess ? '✅ Copied!' : '📋 Copy Reply'}
              </button>
            </div>
            <div className="reply-content">
              {generatedReply}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
