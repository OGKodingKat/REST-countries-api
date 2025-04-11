import { useState, useEffect } from 'react';

function UserForm() {
  const [userName, setUserName] = useState(null);
  const [formData, setFormData] = useState(() => {
    // Retrieve initial data from local storage if available
    const savedData = localStorage.getItem('userFormData');
    return savedData
      ? JSON.parse(savedData)
      : { name: '', email: '', country: '', bio: '' };
  });

const addUser = async (userData) => {
  const response = await fetch('/api/add-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  });
  }



  const getUser = async () => {
    const response = await fetch('/api/get-all-users');
    const data = await response.json();
    console.log('Fetched users:', data);
    console.log('username fetched', data.name)
    console.log('username fetch', data[data.length - 1].name);
    setUserName(data[data.length - 1].name);
  };
  useEffect(() => {
    getUser();
  }, [userName]);
  // Fetch user data from the server

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
    addUser(formData);
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
      {userName && <p>Welcome {userName}!</p>}
    </div>
  );
}

export default UserForm;
