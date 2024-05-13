import React, { useEffect, useState } from 'react';
import "./Account.css";
import axios from "axios";

export default function AccountSettings() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isSaved, setIsSaved] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    fetchUserData()
  })

  const fetchUserData = () => {
    const url =
      "https://pm-platform-backend.onrender.com/api/users/find/6629442719d2130518b601a8";
    axios
      .get(url)
      .then((res) => {
        // const userData = res.data;
        // setOriginalData(userData.profile);
        // setUsername(userData.profile.username);
        // setEmail(userData.profile.email);
        // setFullName(userData.profile.fullName);
        // setJobTitle(userData.profile.jobTitle);
        // setTheme(userData.profile.theme);
        // setNotifications(userData.profile.notifications);
        const userData = res.data;
        setOriginalData(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setFullName(userData.profile.full_name);
        setJobTitle(userData.profile.job_title);
        setTheme(userData.preferences.theme);
        setNotifications(userData.preferences.notifications);
        // console.log(userData)
        console.log(originalData) 
        // de mesh estra7a, wala ana mo7areb, w kosom elma3rka 3aly feha 
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleDeleteAccount = () => {
    const url = 'https://pm-platform-backend.onrender.com/api/tasks/user/delete/';
    axios.delete(url)
      .catch(error => {
        console.error('Error deleting user:', error);
      })
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

  const handleEditAccount = () => {
    setEditMode(true);
  };

  const handleSaveAccount = () => {
    // Only save changes if in edit mode
    if (editMode) {
      const userData = {
        username,
        email,
        fullName,
        jobTitle,
        theme,
        notifications,
      };

      const isDataChanged =
        username !== originalData.username ||
        email !== originalData.email ||
        fullName !== originalData.fullName ||
        jobTitle !== originalData.jobTitle ||
        theme !== originalData.theme ||
        JSON.stringify(notifications) !== JSON.stringify(originalData.notifications);

      if (isDataChanged) {
        const url = 'https://pm-platform-backend.onrender.com/api/users/update/6629442719d2130518b601a8'
        axios.put(url, userData)
          .then(() => {
            setOriginalData(userData)
            setIsSaved(true)
            setEditMode(false) // Disable edit mode after saving
          })
          .catch(error => {
            console.error('Error updating user data:', error)
          })
      } else {
        setIsSaved(true)
        setEditMode(false)
      }
    } else {
      setIsSaved(true)
    }
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <div className="user-info">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            readOnly={!editMode}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            readOnly={!editMode}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label>Profile Full Name:</label>
          <input
            type="text"
            value={fullName}
            readOnly={!editMode}
            onChange={handleFullNameChange}
          />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            readOnly={!editMode}
            onChange={handleJobTitleChange}
          />
        </div>
      </div>
      <div className="preferences">
        <h2>Preferences</h2>
        <div className="form-group">
          <label>Theme:</label>
          <select value={theme} onChange={handleThemeChange}>
            <option value="Light Mode">Light Mode</option>
            <option value="Dark Mode">Dark Mode</option>
          </select>
        </div>
        <div className="form-group">
          <label>Notifications:</label>
          <ul>
            {/* <li>
              <input
                type="checkbox"
                value="Email"
                checked={notifications.includes("Email")}
                onChange={handleNotificationChange}
              />
              <label>Email</label>
            </li>
            <li>
              <input
                type="checkbox"
                value="SMS"
                checked={notifications.includes("SMS")}
                onChange={handleNotificationChange}
              />
              <label>SMS</label>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="other-options">
        <h2>Other Options</h2>
        {editMode ? (
          <>
            <button className="edit-account-button" onClick={fetchUserData}>
              Cancel
            </button>
            <button
              className="delete-account-button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
            <button
              className="save-account-button"
              onClick={handleSaveAccount}
              disabled={isSaved}
            >
              Save Changes
            </button>
          </>
        ) : (
          <button className="edit-account-button" onClick={handleEditAccount}>
            Edit Account
          </button>
        )}
      </div>
    </div>
  );
}

// export default function AccountSettings() {


//   const [editMode, setEditMode] = useState(false);
//   const [username, setUsername] = useState('GannaMohamed777');
//   const [email, setEmail] = useState('gannamohamed7776@gmail.com');
//   const [fullName, setFullName] = useState('Ganna Mohamed');
//   const [jobTitle, setJobTitle] = useState('Frontend Engineer');
//   const [theme, setTheme] = useState('Light Mode');
//   const [notifications, setNotifications] = useState(['Email', 'SMS']);
//   const [originalData, setOriginalData] = useState({
//     username: '',
//     email: '',
//     fullName: '',
//     jobTitle: '',
//     theme: '',
//     notifications: ['', ''],
//   });
//   const [isSaved, setIsSaved] = useState(true);

  

//   const handleEditAccount = () => {
//     setEditMode(true);
//     setOriginalData({
//       username: username,
//       email: email,
//       fullName: fullName,
//       jobTitle: jobTitle,
//       theme: theme,
//       notifications: notifications,
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setUsername('GannaMohamed777');
//     setEmail('gannamohamed7776@gmail.com');
//     setFullName('Ganna Mohamed');
//     setJobTitle('Frontend Engineer');
//     setTheme('Light Mode');
//     setNotifications(['Email', 'SMS']);
//   };

//   const handleDeleteAccount = () => {
//     // Add code here to delete the user's account
//   };

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//     setIsSaved(false);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setIsSaved(false);
//   };

//   const handleFullNameChange = (e) => {
//     setFullName(e.target.value);
//     setIsSaved(false);
//   };

//   const handleJobTitleChange = (e) => {
//     setJobTitle(e.target.value);
//     setIsSaved(false);
//   };

//   const handleThemeChange = (e) => {
//     setTheme(e.target.value);
//     setIsSaved(false);
//   };

//   const handleNotificationChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setNotifications([...notifications, value]);
//     } else {
//       setNotifications(notifications.filter((notification) => notification !== value));
//     }
//     setIsSaved(false);
//   };

//   const handleSaveAccount = () => {
//     const isDataChanged =
//       username !== originalData.username ||
//       email !== originalData.email ||
//       fullName !== originalData.fullName ||
//       jobTitle !== originalData.jobTitle ||
//       theme !== originalData.theme ||
//       JSON.stringify(notifications) !== JSON.stringify(originalData.notifications);
//     // if (!isDataChanged) {
//     //   setIsSaved(true);
//     // } else {
//     //   setIsSaved(false);
//     // }
//     console.log(originalData)

//   };

//   return (
//     <div className="account-settings">
//       <h1>Account Settings</h1>
//       <div className="user-info">
//         <div className="form-group">
//           <label>Username:</label>
//           <input type="text" value={username} readOnly={!editMode} onChange={handleUsernameChange} />
//         </div>
//         <div className="form-group">
//           <label>Email Address:</label>
//           <input type="email" value={email} readOnly={!editMode} onChange={handleEmailChange} />
//         </div>
//         <div className="form-group">
//           <label>Profile Full Name:</label>
//           <input type="text" value={fullName} readOnly={!editMode} onChange={handleFullNameChange} />
//         </div>
//         <div className="form-group">
//           <label>Job Title:</label>
//           <input type="text" value={jobTitle} readOnly={!editMode} onChange={handleJobTitleChange} />
//         </div>
//       </div>
//       <div className="preferences">
//         <h2>Preferences</h2>
//         <div className="form-group">
//           <label>Theme:</label>
//           <select value={theme} onChange={(e) => setTheme(e.target.value)}>
//             <option value="Light Mode">Light Mode</option>
//             <option value="Dark Mode">Dark Mode</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Notifications:</label>
//           <ul>
//             <li>
//               <input
//                 type="checkbox"
//                 value="Email"
//                 checked={notifications.includes('Email')}
//                 onChange={handleNotificationChange}
//               />
//               <label>Email</label>
//             </li>
//             <li>
//               <input
//                 type="checkbox"
//                 value="SMS"
//                 checked={notifications.includes('SMS')}
//                 onChange={handleNotificationChange}
//               />
//               <label>SMS</label>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="other-options">
//         <h2>Other Options</h2>
//         {editMode ? (
//           <>
//             <button className="edit-account-button" onClick={handleCancelEdit}>Cancel</button>
//             <button className="delete-account-button" onClick={handleDeleteAccount}>Delete Account</button>
//             <button className="save-account-button" onClick={handleSaveAccount} disabled={isSaved}>Save Changes</button>
//           </>
//         ) : (
//           <button className="edit-account-button" onClick={handleEditAccount}>Edit Account</button>
//         )}
//       </div>
//     </div>
//   );
// }