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
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = formData;
    console.log(dataObj);
    setFormData({ name: '', email: '', country: '', bio: '' }); 
    // Reset the form
    // send dataObj to backend
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

