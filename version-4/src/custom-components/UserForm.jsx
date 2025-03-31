import { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    bio: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Send data to backend instead of just logging it
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:${port}/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit user data');
      }

      const data = await response.json();
      console.log('User Created:', data);

      // Reset the form after successful submission
      setFormData({ name: '', email: '', country: '', bio: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>My Profile</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />

      <textarea
        rows="5"
        cols="40"
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        required
      />

      <div className="button-wrapper">
        <input type="submit" value="Submit" />
        <button type="button" onClick={handleBack} className="back-btn">
          Back
        </button>
      </div>
    </form>
  );
}

export default UserForm;
