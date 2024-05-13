import React, { useState } from 'react';
import "./Account.css";

export default function AccountSettings() {


  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('GannaMohamed777');
  const [email, setEmail] = useState('gannamohamed7776@gmail.com');
  const [fullName, setFullName] = useState('Ganna Mohamed');
  const [jobTitle, setJobTitle] = useState('Frontend Engineer');
  const [theme, setTheme] = useState('Light Mode');
  const [notifications, setNotifications] = useState(['Email', 'SMS']);
  const [originalData, setOriginalData] = useState({
    username: '',
    email: '',
    fullName: '',
    jobTitle: '',
    theme: '',
    notifications: ['', ''],
  });
  const [isSaved, setIsSaved] = useState(true);

  

  const handleEditAccount = () => {
    setEditMode(true);
    setOriginalData({
      username: username,
      email: email,
      fullName: fullName,
      jobTitle: jobTitle,
      theme: theme,
      notifications: notifications,
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setUsername('GannaMohamed777');
    setEmail('gannamohamed7776@gmail.com');
    setFullName('Ganna Mohamed');
    setJobTitle('Frontend Engineer');
    setTheme('Light Mode');
    setNotifications(['Email', 'SMS']);
  };

  const handleDeleteAccount = () => {
    // Add code here to delete the user's account
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsSaved(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsSaved(false);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setIsSaved(false);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
    setIsSaved(false);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setIsSaved(false);
  };

  const handleNotificationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNotifications([...notifications, value]);
    } else {
      setNotifications(notifications.filter((notification) => notification !== value));
    }
    setIsSaved(false);
  };

  const handleSaveAccount = () => {
    const isDataChanged =
      username !== originalData.username ||
      email !== originalData.email ||
      fullName !== originalData.fullName ||
      jobTitle !== originalData.jobTitle ||
      theme !== originalData.theme ||
      JSON.stringify(notifications) !== JSON.stringify(originalData.notifications);
    // if (!isDataChanged) {
    //   setIsSaved(true);
    // } else {
    //   setIsSaved(false);
    // }
    console.log(originalData)

  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <div className="user-info">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} readOnly={!editMode} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input type="email" value={email} readOnly={!editMode} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label>Profile Full Name:</label>
          <input type="text" value={fullName} readOnly={!editMode} onChange={handleFullNameChange} />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input type="text" value={jobTitle} readOnly={!editMode} onChange={handleJobTitleChange} />
        </div>
      </div>
      <div className="preferences">
        <h2>Preferences</h2>
        <div className="form-group">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="Light Mode">Light Mode</option>
            <option value="Dark Mode">Dark Mode</option>
          </select>
        </div>
        <div className="form-group">
          <label>Notifications:</label>
          <ul>
            <li>
              <input
                type="checkbox"
                value="Email"
                checked={notifications.includes('Email')}
                onChange={handleNotificationChange}
              />
              <label>Email</label>
            </li>
            <li>
              <input
                type="checkbox"
                value="SMS"
                checked={notifications.includes('SMS')}
                onChange={handleNotificationChange}
              />
              <label>SMS</label>
            </li>
          </ul>
        </div>
      </div>
      <div className="other-options">
        <h2>Other Options</h2>
        {editMode ? (
          <>
            <button className="edit-account-button" onClick={handleCancelEdit}>Cancel</button>
            <button className="delete-account-button" onClick={handleDeleteAccount}>Delete Account</button>
            <button className="save-account-button" onClick={handleSaveAccount} disabled={isSaved}>Save Changes</button>
          </>
        ) : (
          <button className="edit-account-button" onClick={handleEditAccount}>Edit Account</button>
        )}
      </div>
    </div>
  );
}