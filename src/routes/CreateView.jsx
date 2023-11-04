import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { supabase } from '../client.jsx';

const createPost = async (formData, navigate) => { 
  try {
    const { data, error } = await supabase
      .from('Crewmates')
      .insert([
        { name: formData.name, speed: formData.speed, color: formData.color }
      ]);

    if (error) throw error;

    // Show an alert to the user
    alert('New Crewmate Created successfully!');

    // Redirect to the gallery view after showing the alert
    navigate('/gallery');
  } catch (error) {
    console.error('Error inserting data: ', error);
    alert('Failed to create crewmate.'); // Show an error alert if something goes wrong
  }
};
const CreateView = () => {
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createPost(formData, navigate); // Pass navigate function to createPost
  };

  return (
    <div>
      <h1> Create a New Crewmate</h1>
      <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" className="small-img" alt="Crewmate" />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="miniform-container">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter crewmate's name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="miniform-container">
            <label htmlFor="speed">Speed: </label>
            <input
              type="number"
              id="speed"
              name="speed"
              placeholder="Enter speed in miles/hr"
              value={formData.speed}
              onChange={handleChange}
            />
          </div>
          <div className="miniform-container">
            <p>Color: </p>
            <label htmlFor="red">
              <input
                type="radio"
                id="red"
                name="color"
                value="red"
                checked={formData.color === 'red'}
                onChange={handleChange}
              />
              Red
            </label>

            <label htmlFor="blue">
              <input
                type="radio"
                id="blue"
                name="color"
                value="blue"
                checked={formData.color === 'blue'}
                onChange={handleChange}
              />
              Blue
            </label>

            <label htmlFor="green">
              <input
                type="radio"
                id="green"
                name="color"
                value="green"
                checked={formData.color === 'green'}
                onChange={handleChange}
              />
              Green
            </label>

            <label htmlFor="purple">
              <input
                type="radio"
                id="purple"
                name="color"
                value="purple"
                checked={formData.color === 'purple'}
                onChange={handleChange}
              />
              Purple
            </label>

            <label htmlFor="rainbow">
              <input
                type="radio"
                id="rainbow"
                name="color"
                value="rainbow"
                checked={formData.color === 'rainbow'}
                onChange={handleChange}
              />
              Rainbow
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateView;