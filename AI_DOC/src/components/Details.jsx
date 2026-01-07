import React, { useState } from 'react';
import './Details.css';
import Navbar from './Navbar';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';


const Details = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    symptoms: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selected) => {
    setFormData({
      ...formData,
      symptoms: selected.map(option => option.value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('http://127.0.0.1:5000/submit-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      console.log('Success:', data);
      setSuccessMessage('Submitted successfully!');
      setSubmitted(true);
    })
    .catch((error) => {
      setIsLoading(false);
      console.error('Error:', error);
    });
  };

  const goToPredictPage = () => {
    navigate('/Predict');
  };

  return (
    <div className="containers">
      <Navbar />
      <div className="form-containers">
        <h2>Enter Patient Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
         
          <button type="submit" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit'}</button>
        </form>

        {submitted && (
          <div className="modal">
            <div className="modal-content">
              <p>{successMessage}</p>
              <button onClick={goToPredictPage}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
