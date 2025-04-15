import { useState, useEffect } from 'react';

function UserForm() {
  const [userName, setUserName] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedCountries, setSavedCountries] = useState([]); // <-- NEW

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    bio: ''
  });

  const addUser = async (userData) => {
    try {
      const response = await fetch('/api/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', country: '', bio: '' });
        getUser(); // update user info
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch('/api/get-all-users');
      const data = await response.json();
      const lastUser = data[data.length - 1];
      setUserName(lastUser?.name || '');
      fetchSavedCountries(lastUser?.user_id); // <-- fetch after we know the user
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // NEW FUNCTION
  const fetchSavedCountries = async (user_id) => {
    try {
      const res = await fetch(`/api/saved-countries?user_id=${user_id}`);
      const countries = await res.json();
      setSavedCountries(countries);
    } catch (error) {
      console.error('Error fetching saved countries:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      {!isSubmitted ? (
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
      ) : (
        <>
          {userName && <p>Welcome {userName}!</p>}
          {savedCountries.length > 0 ? (
            <div>
              <h4>Your Saved Countries:</h4>
              <ul>
                {savedCountries.map((c, i) => (
                  <li key={i}>{c.country_name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No saved countries yet.</p>
          )}
        </>
      )}
    </div>
  );
}

export default UserForm;
