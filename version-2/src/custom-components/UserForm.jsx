import { useState, useEffect } from 'react';

function UserForm() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('userFormData');
    return savedData
      ? JSON.parse(savedData)
      : { name: '', email: '', country: '', bio: '' };
  });

  const [isFormFilled, setIsFormFilled] = useState(() => {
    const savedData = localStorage.getItem('userFormData');
    return savedData ? JSON.parse(savedData).name !== '' : false;
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      localStorage.setItem('userFormData', JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure all fields are filled before submitting
    if (formData.name && formData.email && formData.country && formData.bio) {
      localStorage.setItem('userFormData', JSON.stringify(formData));
      setIsFormFilled(true);
    }
  };

  return (
    <div>
      {isFormFilled ? (
        <h2>Welcome, {formData.name}!</h2>
      ) : (
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
      )}
    </div>
  );
}

export default UserForm;
