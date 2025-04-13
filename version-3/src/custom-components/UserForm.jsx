import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    bio: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'users'), formData);
      console.log('User data added to Firestore!');
      setFormData({ name: '', email: '', country: '', bio: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
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
  );
}

export default UserForm;
