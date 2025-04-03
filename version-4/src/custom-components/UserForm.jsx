import { useState, useEffect } from 'react';

function UserForm() {
  const [formData, setFormData] = useState(() => {
    // Retrieve initial data from local storage if available
    const savedData = localStorage.getItem('userFormData');
    return savedData
      ? JSON.parse(savedData)
      : { name: '', email: '', country: '', bio: '' };
  });

  useEffect(() => {
    // Fetch initial data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/userFormData');
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Failed to fetch data from server');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      // Optionally, send updated data to the server
      fetch('http://localhost:3000/userFormData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      }).catch((error) => console.error('Error updating data:', error));

      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    setFormData({ name: '', email: '', country: '', bio: '' }); 
    // Reset the form
    
  };
  const handleBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>My Profile</h2>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          id="country"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <textarea
          rows="5"
          cols="40"
          id="bio"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />

        <div className="button-wrapper">
          <input type="submit" id="submit" value="Submit" />
          <button type="button" onClick={handleBack} className="back-btn">
            Back
          </button>
        </div>
      </form>
      {formData.name && <p>Welcome {formData.name}!</p>}
    </div>
  );
};

export default UserForm;
