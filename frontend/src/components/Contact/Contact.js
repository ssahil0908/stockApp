import React, { useState } from 'react';
import './Contact.css';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {

      toast.error('Please fill in all fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    // Display toast for successful form submission
    toast.success('Form submitted successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  
    // Reset form data
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            placeholder="Type your message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="button" onClick={submitForm}>
            Submit
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Contact;
