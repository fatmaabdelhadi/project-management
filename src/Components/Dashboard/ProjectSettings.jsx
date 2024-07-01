import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getUserID, getUserProjects } from "../../Services/UserModel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "./Project.css";
import ProjectLinks from "./ProjectLinks";

function ProjectSettings() {
  document.title = "Project Settings";

  const [rows, setRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const priorityOptions = ["Urgent", "Important", "Medium", "Low"];
  const statusOptions = ["Late", "Not Started", "In Progress", "Completed"];
  const [projectid, setprojectid] = useState("");

  const { projectID } = useParams();
  // const history = useHistory();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userid = await getUserID();
        const userProjects = await getUserProjects(userid);
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projectID) {
      setSelectedProject(projectID);
      fetchTasks(projectID);
    }
  }, [projectID]);

  const fetchTasks = async (projectId) => {
    try {
      const apiUrl = `https://pm-platform-backend.onrender.com`;
      const response = await axios.get(`${apiUrl}/api/tasks/project/${projectId}`);
      const tasksWithId = response.data.map((task) => ({
        ...task,
        id: task._id,
        startDate: task.startDate ? new Date(task.startDate) : null,
        endDate: task.endDate ? new Date(task.endDate) : null,
      }));
      setRows(tasksWithId);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditClick = (id) => {
    const taskToEdit = rows.find((task) => task.id === id);
    setEditingRow(id);
    setEditedTask(taskToEdit);
  };

  const handleFieldChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
    setEditedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleSaveClick = async (id) => {
    try {
      const updatedTaskIndex = rows.findIndex((task) => task.id === id);
      if (updatedTaskIndex === -1) {
        console.error("Task not found for id:", id);
        return;
      }

      const updatedTask = { ...rows[updatedTaskIndex], ...editedTask };

      const apiUrl = `https://pm-platform-backend.onrender.com`;
      await axios.put(`${apiUrl}/api/tasks/update/${id}`, updatedTask);

      setRows((prevRows) =>
        prevRows.map((task) => (task.id === id ? updatedTask : task))
      );
      if (updatedTask.status === "Completed") {
        await axios.put(
          `${apiUrl}/api/projects/percentage/${updatedTask.project}`
        );
      }
      setEditingRow(null);
      setEditedTask({});
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const apiUrl = `https://pm-platform-backend.onrender.com`;
      await axios.delete(`${apiUrl}/api/tasks/delete/${id}`);
      setRows((prevRows) => prevRows.filter((task) => task.id !== id));
      // const projectId = getProjectID();
      await axios.post(`${apiUrl}/api/calculateEarly/${projectid}`);
      await axios.post(`${apiUrl}/api/calculateLate/${projectid}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleProjectChange = async (projectId) => {
    try {
      // Update projectid state if needed
      setprojectid(projectId);
      navigate("/project-settings/"+projectId)
      // Optionally navigate to the new project settings page
      // Uncomment and use one of the following navigation methods:
      // history.push(`/project-settings/${projectId}`);
      // navigate(`/project-settings/${projectId}`);
  
      // Fetch tasks for the selected project
      await fetchTasks(projectId);
    } catch (error) {
      console.error("Error handling project change:", error);
    }
  };

  return (
    <div>
      <ProjectLinks projectID={projectid}/>
      <div className="searchProject">
        <FormControl className="projectSelect">
          <label className="selectLabel"> Project Name &nbsp;&nbsp;&nbsp;</label>
          <Select
            className="selectBar"
            labelId="projectSelectLabel"
            id="projectSelect"
            value={selectedProject || ""}
            onChange={(e) => handleProjectChange(e.target.value)}
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.projectName}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                <em>No projects available</em>
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>

      <table className="projectTable">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                {editingRow === row.id ? (
                  <TextField
                    value={editedTask.taskName || row.taskName}
                    onChange={(e) =>
                      handleFieldChange(row.id, "taskName", e.target.value)
                    }
                  />
                ) : (
                  row.taskName
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <TextField
                    type="date"
                    value={
                      editedTask.startDate
                        ? editedTask.startDate.toISOString().split("T")[0]
                        : row.startDate
                        ? row.startDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        row.id,
                        "startDate",
                        new Date(e.target.value)
                      )
                    }
                  />
                ) : row.startDate ? (
                  row.startDate.toDateString()
                ) : (
                  ""
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <TextField
                    type="date"
                    value={
                      editedTask.endDate
                        ? editedTask.endDate.toISOString().split("T")[0]
                        : row.endDate
                        ? row.endDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        row.id,
                        "endDate",
                        new Date(e.target.value)
                      )
                    }
                  />
                ) : row.endDate ? (
                  row.endDate.toDateString()
                ) : (
                  ""
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <Select
                    value={editedTask.priority || row.priority}
                    onChange={(e) =>
                      handleFieldChange(row.id, "priority", e.target.value)
                    }
                  >
                    {priorityOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  row.priority
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <Select
                    value={editedTask.status || row.status}
                    onChange={(e) =>
                      handleFieldChange(row.id, "status", e.target.value)
                    }
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  row.status
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <TextField
                    type="number"
                    value={editedTask.cost || row.cost}
                    onChange={(e) =>
                      handleFieldChange(row.id, "cost", e.target.value)
                    }
                  />
                ) : (
                  row.cost
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <TextField
                    value={editedTask.description || row.description}
                    onChange={(e) =>
                      handleFieldChange(row.id, "description", e.target.value)
                    }
                  />
                ) : (
                  row.description
                )}
              </td>
              <td>
                {editingRow === row.id ? (
                  <>
                    <SaveIcon onClick={() => handleSaveClick(row.id)} />
                    <CancelIcon onClick={() => setEditingRow(null)} />
                  </>
                ) : (
                  <>
                    <EditIcon onClick={() => handleEditClick(row.id)} />
                    <DeleteIcon onClick={() => handleDeleteClick(row.id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectSettings;
