import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip, Button } from "@mui/material";
import { getUserID } from "../../Services/UserModel";
import axios from "axios";
import { findProjectByID } from "../../Services/ProjectModel";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function ProjectLinks() {
  // Assets
  const SettingsImg = require("../../Assets/settings.svg").default;
  const AddImg = require("../../Assets/add.png");
  const DashboardImg = require("../../Assets/dashboard.svg").default;
  const DeleteImg = require("../../Assets/delete.svg").default;

  const { projectID } = useParams();
  const [userId, setUserId] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [project, setProject] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserID();
        setUserId(user);
        const projectData = await findProjectByID(projectID);
        setProject(projectData);
        if (projectData && projectData.projectManager === user) {
          setIsManager(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [projectID]);

  const handleDeleteProject = async () => {
    try {
      const apiUrl = "https://pm-platform-backend.onrender.com";
      await axios.delete(`${apiUrl}/api/projects/delete/${projectID}`);
      // Assuming successful deletion
      alert("Project Deleted Successfully");
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="d-flex flex-row-reverse gap-3 m-5 align-items-center">
      <Tooltip title="Add New Tasks">
        <NavLink to={`/create-tasks/${projectID}`} key="create-tasks">
          <img
            src={AddImg}
            alt="Add New Tasks"
            style={{ textShadow: "0 10px 10px 10px grey" }}
          />
        </NavLink>
      </Tooltip>
      <Tooltip title="View Dashboard">
        <NavLink to={`/dashboard/${projectID}`} key="dashboard">
          <img
            src={DashboardImg}
            alt="View Dashboard"
            style={{ textShadow: "0 1px 1px 1px grey" }}
          />
        </NavLink>
      </Tooltip>
      {isManager && (
        <>
          <Tooltip title="Edit Tasks">
            <NavLink
              to={`/project-settings/${projectID}`}
              key="project-settings"
            >
              <img
                src={SettingsImg}
                alt="Edit Tasks"
                style={{ textShadow: "var(--shadow)" }}
              />
            </NavLink>
          </Tooltip>
          <Tooltip title="Delete Project">
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowModal(true)} // Set showModal to true to show modal
            >
              <img src={DeleteImg} alt="Delete Project" />
            </Button>
          </Tooltip>
        </>
      )}

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            className="danger"
            variant="danger"
            onClick={handleDeleteProject}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
