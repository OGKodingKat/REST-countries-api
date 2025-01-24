import { useState, useEffect } from 'react';

function UserForm() {
  const [formData, setFormData] = useState(() => {
    // Retrieve initial data from local storage if available
    const savedData = localStorage.getItem('userFormData');
    return savedData
      ? JSON.parse(savedData)
      : { name: '', email: '', country: '', bio: '' };
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      localStorage.setItem('userFormData', JSON.stringify(updatedFormData)); 
      // Update local storage
      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    setFormData({ name: '', email: '', country: '', bio: '' }); 
    // Reset the form
    
  };

  return (
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
      </div>
    </form>
  );
}

export default UserForm;
