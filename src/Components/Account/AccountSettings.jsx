import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Account.css";

export default function AccountSettings() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null); // State to hold user data
  const [updatedUserData, setUpdatedUserData] = useState(null); // State to hold updated user data

  useEffect(() => {
    // Fetch user data when the component mounts
    axios.get(`https://pm-platform-backend.onrender.com/api/users/find/6629442719d2130518b601a8`)
      .then(response => {
        setUserData(response.data);
        setUpdatedUserData({ ...response.data }); // Initialize updatedUserData with all nested properties
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    // Call API to save updatedUserData
    axios.put(`https://pm-platform-backend.onrender.com/api/users/update/6629442719d2130518b601a8`, updatedUserData)
      .then(response => {
        console.log("Changes saved successfully:", response.data);
        setUserData(updatedUserData); // Update userData with the updatedUserData
        setEditMode(false); // Exit edit mode after saving changes
      })
      .catch(error => {
        console.error('Error saving changes:', error);
      });
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      // Call API to delete the user
      // axios.delete(`https://pm-platform-backend.onrender.com/api/users/delete/${userData._id}`)
      axios.delete(`https://pm-platform-backend.onrender.com/api/users/delete/6629442719d2130518b601aa`)
        .then(response => {
          console.log("User deleted successfully:", response.data);
          // Optionally, you can navigate the user to a different page or perform any cleanup tasks after deletion.
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the property name includes a dot, it indicates a nested property
    if (name.includes('.')) {
      const [parentProperty, nestedProperty] = name.split('.'); // Split the property name
      setUpdatedUserData(prevUserData => ({
        ...prevUserData,
        profile: {
          ...prevUserData.profile, // Preserve other properties in the profile object
          [nestedProperty]: value // Update the nested property
        }
      }));
    } else {
      // If not a nested property, update directly
      setUpdatedUserData(prevUserData => ({
        ...prevUserData,
        [name]: value
      }));
    }
  };

  return (
    <div className="account-settings">
      {userData && (
        <>
          <h1>Account Settings</h1>
          <div className="user-info">
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="username" value={editMode ? updatedUserData.username : userData.username} readOnly={!editMode} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Email Address:</label>
              <input type="email" name="email" value={editMode ? updatedUserData.email : userData.email} readOnly={!editMode} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Profile Full Name:</label>
              <input type="text" name="profile.fullName" value={editMode ? updatedUserData.profile.fullName : userData.profile.fullName} readOnly={!editMode} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Job Title:</label>
              <input type="text" name="profile.jobTitle" value={editMode ? updatedUserData.profile.jobTitle : userData.profile.jobTitle} readOnly={!editMode} onChange={handleInputChange} />
            </div>
          </div>
          <div className="other-options">
            {editMode ? (
              <>
                <button className="save-account-button" onClick={handleSaveChanges}>Save Changes</button>
              </>
            ) : (
              <>
                <button className="edit-account-button" onClick={handleEditClick}>Edit Account</button>
                <button className="delete-account-button" onClick={handleDeleteAccount}>Delete Account</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
