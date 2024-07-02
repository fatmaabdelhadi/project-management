import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip, Modal, Button } from "@mui/material";
import { getUserID } from "../../Services/UserModel";
import axios from "axios";

export default function ProjectLinks({ projectID }) {
  // Assets
  let SettingsImg = require("../../Assets/settings.svg").default;
  let AddImg = require("../../Assets/add.png");
  let DashboardImg = require("../../Assets/dashboard.svg").default;
  let DeleteImg = require("../../Assets/delete.svg").default;

  const [userid, setUserId] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getUserID();
        setUserId(user);
        // Replace with logic to check if user is the manager
        // For demonstration, let's assume user is always the manager
        setIsManager(true); // Set to true for demonstration
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleDeleteProject = async () => {
    try {
      const apiUrl = `https://pm-platform-backend.onrender.com`;
      await axios.delete(`${apiUrl}/api/projects/${projectID}`);
      setShowDeleteModal(false); // Close modal after deletion
      // Handle any UI updates or redirects after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="d-flex flex-row-reverse gap-3 m-5">
      <Tooltip title="Add New Tasks">
        <NavLink to={`/create-tasks/${projectID}`} key="create-tasks">
          <img src={AddImg} />
        </NavLink>
      </Tooltip>
      <Tooltip title="View Dashboard">
        <NavLink to={`/dashboard/${projectID}`} key="dashboard">
          <img src={DashboardImg} />
        </NavLink>
      </Tooltip>
      {isManager && (
        <Tooltip title="Edit Tasks">
          <NavLink to={`/project-settings/${projectID}`} key="project-settings">
            <img src={SettingsImg} />
          </NavLink>
          <Button onClick={() => setShowDeleteModal(true)}>
            <img src={DeleteImg} />
          </Button>
        </Tooltip>
      )}
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div className="modal">
          <h2 id="delete-modal-title">
            Are you sure you want to delete this project?
          </h2>
          <div className="modal-actions">
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button onClick={handleDeleteProject}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
