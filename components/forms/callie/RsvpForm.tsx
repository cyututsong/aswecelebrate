import React, { useState, ChangeEvent, SubmitEvent } from 'react';

export interface RsvpFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no';
  phone: string;
  comments: string;
}

interface RsvpFormProps {
  onSubmit?: (data: RsvpFormData) => void;
}

export default function RsvpForm({ onSubmit }: RsvpFormProps) {
  const [formData, setFormData] = useState<RsvpFormData>({
    name: '',
    email: '',
    attending: 'yes',
    phone: '',
    comments: ''
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Modern React 19+ / TS typing using SubmitEvent
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('RSVP Submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      {/* Name Field (Optional) */}
      <div style={styles.fieldGroup}>
        <label htmlFor="name" style={styles.label}>
          Name of Guest <span style={styles.optionalText}>(Optional)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          style={styles.input}
        />
      </div>

      {/* Email Field (Optional) */}
      <div style={styles.fieldGroup}>
        <label htmlFor="email" style={styles.label}>
          Email Address <span style={styles.optionalText}>(Optional)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          style={styles.input}
        />
      </div>

      {/* Attendance Radio Options */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Might we expect your presence?</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={formData.attending === 'yes'}
              onChange={handleChange}
              style={styles.radioInput}
            />
            Yes, I'll be there
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="attending"
              value="no"
              checked={formData.attending === 'no'}
              onChange={handleChange}
              style={styles.radioInput}
            />
            Sorry, can't make it
          </label>
        </div>
      </div>

      {/* Phone Field */}
      <div style={styles.fieldGroup}>
        <label htmlFor="phone" style={styles.label}>
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          style={styles.input}
        />
      </div>

      {/* Comments Text Area */}
      <div style={styles.fieldGroup}>
        <label htmlFor="comments" style={styles.label}>
          Any other comments?
        </label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          placeholder="Let us know if you have any questions or dietary requirements..."
          style={styles.textarea}
        />
      </div>

      <button type="submit" style={styles.submitButton}>
        Send RSVP
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  formContainer: {
    maxWidth: '700px',
    width: '100vw',
    margin: '0 auto',
    padding: '50px',
    backgroundColor: '#ffffff',
    borderRadius: '0px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'sans-serif'
  },
  heading: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    textAlign: 'center',
    color: '#1a2530'
  },
  subheading: {
    marginBottom: '24px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#555555'
  },
  fieldGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#333333'
  },
  optionalText: {
    fontWeight: 'normal',
    color: '#777777',
    fontSize: '12px'
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none'
  },
  textarea: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
    outline: 'none'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '4px'
  },
  radioLabel: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  radioInput: {
    marginRight: '8px'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#2b4263',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};