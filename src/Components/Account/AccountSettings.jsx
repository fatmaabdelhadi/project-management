import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Account.css"
import { getUserID } from "../../Services/UserModel"
import { Modal, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  document.title = "Account Settings"

  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState(null) // State to hold user data
  const [updatedUserData, setUpdatedUserData] = useState(null) // State to hold updated user data
  const [userID, setUserID] = useState("")
  const [newPassword, setNewPassword] = useState("") // State to hold the new password
  const [showDeleteModal, setShowDeleteModal] = useState(false) // State to control the modal visibility
  const navigate = useNavigate()

  useEffect(() => {
    setUserID(getUserID())

    axios
      .get(`https://pm-platform-backend.onrender.com/api/users/find/${userID}`)
      .then((response) => {
        setUserData(response.data);
        setUpdatedUserData({ ...response.data }); // Initialize updatedUserData with all nested properties
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userID]); // Empty dependency array ensures this effect runs only once

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    axios
      .put(
        `https://pm-platform-backend.onrender.com/api/users/update/${userID}`,
        updatedUserData
      )
      .then((response) => {
        console.log("Changes saved successfully:", response.data);
        setUserData(response.data); // Update userData with the updatedUserData
        setEditMode(false); // Exit edit mode after saving changes
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
      });
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true)
  }

  const confirmDeleteAccount = () => {
    axios
      .delete(
        `https://pm-platform-backend.onrender.com/api/users/delete/${userID}`
      )
      .then((response) => {
        console.log("User deleted successfully:", response.data)
        setShowDeleteModal(false)
        navigate("/signup") // Redirect to the sign-up screen after deleting the account
      })
      .catch((error) => {
        console.error("Error deleting user:", error)
        navigate("/SignUp")
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the property name includes a dot, it indicates a nested property
    if (name.includes(".")) {
      const [parentProperty, nestedProperty] = name.split("."); // Split the property name
      setUpdatedUserData((prevUserData) => ({
        ...prevUserData,
        profile: {
          ...prevUserData.profile, // Preserve other properties in the profile object
          [nestedProperty]: value, // Update the nested property
        },
      }));
    } else {
      // If not a nested property, update directly
      setUpdatedUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handlePasswordChange = () => {
    axios
      .put(
        `https://pm-platform-backend.onrender.com/api/users/changepassword/${userID}`,
        {
          password: newPassword,
        }
      )
      .then((response) => {
        console.log("Password changed successfully:", response.data);
        setNewPassword(""); // Clear the password input field
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  return (
    <div className="account-settings">
      {userData && (
        <>
          <h1>Account Settings</h1>
          <div className="user-info">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={editMode ? updatedUserData.username : userData.username}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                name="email"
                value={editMode ? updatedUserData.email : userData.email}
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Profile Full Name:</label>
              <input
                type="text"
                name="profile.fullName"
                value={
                  editMode
                    ? updatedUserData.profile.fullName
                    : userData.profile.fullName
                }
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                name="profile.jobTitle"
                value={
                  editMode
                    ? updatedUserData.profile.jobTitle
                    : userData.profile.jobTitle
                }
                readOnly={!editMode}
                onChange={handleInputChange}
              />
            </div>
            {editMode && (
              <>
                {/* <div className="form-group w-100 d-flex justify-content-between"> */}
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    className="inputField"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <button
                    style={{ padding: "5px 10px", borderRadius: "20px" }}
                    onClick={handlePasswordChange}
                  >
                    Change Password
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="other-options">
            {editMode ? (
              <button
                className="save-account-button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            ) : (
              <>
                <button
                  className="edit-account-button"
                  onClick={handleEditClick}
                >
                  Edit Account
                </button>
                <button
                  className="delete-account-button"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </>
            )}
          </div>
        </>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this account?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

