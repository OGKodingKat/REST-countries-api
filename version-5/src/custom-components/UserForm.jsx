import { useState, useEffect } from 'react';


function UserForm() {
  const [userName, setUserName] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    bio: '',
  });

  const addUser = async (userData) => {
    try {
const response = await fetch(`/api/add-user`, { 
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
});
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`/api/get-all-users`)
      const data = await response.json();
      if (data.length > 0) {
        const lastUser = data[data.length - 1];
        setUserName(lastUser.name);
        setFormVisible(false); // Hide form once user is fetched
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(formData);
    setFormData({ name: '', email: '', country: '', bio: '' }); // Clear form
    await getUser(); // Fetch latest user and hide the form
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      {formVisible ? (
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
      ) : (
        userName && <p>Welcome {userName}!</p>
      )}
    </div>
  );
}

export default UserForm;
