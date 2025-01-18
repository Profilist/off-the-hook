import React, { useState } from 'react';

const EmailSender = () => {
  const [emailData, setEmailData] = useState({
    to_email: '',
    subject: '',
    html_content: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('https://rbc-security.onrender.com/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setStatus({
        loading: false,
        success: true,
        error: null
      });
      
      // Clear form after successful submission
      setEmailData({
        to_email: '',
        subject: '',
        html_content: ''
      });

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.message
      });
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to_email">Recipient Email:</label>
          <input
            id="to_email"
            name="to_email"
            type="email"
            value={emailData.to_email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={emailData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="html_content">Content (HTML):</label>
          <textarea
            id="html_content"
            name="html_content"
            value={emailData.html_content}
            onChange={handleChange}
            required
            rows={6}
          />
        </div>

        {status.error && (
          <div style={{ color: 'red' }}>
            Error: {status.error}
          </div>
        )}

        {status.success && (
          <div style={{ color: 'green' }}>
            Email sent successfully!
          </div>
        )}

        <button 
          type="submit" 
          disabled={status.loading}
        >
          {status.loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailSender;