import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useParams } from 'react-router';
import { getProjectID } from "../../Services/ProjectModel";

function ProjectSettings() {
  const [rows, setRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  // const { projectId } = useParams();

  useEffect(() => {
    const apiUrl = `https://pm-platform-backend.onrender.com`; // Adjust to your API base URL

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tasks/project/${getProjectID()}`);
        const tasksWithId = response.data.map((task) => ({
          ...task,
          id: task._id,
          startDate: new Date(task.startDate), // Convert startDate to Date object
          endDate: new Date(task.endDate), // Convert endDate to Date object
        }));
        setRows(tasksWithId);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  });

  const handleEditClick = (id) => {
    setEditingRow(id);
  };

  const handleSaveClick = async (id) => {
    try {
      const updatedTask = rows.find((task) => task.id === id);
      if (!updatedTask) {
        console.error('Task not found for id:', id);
        return;
      }
      const apiUrl = `https://pm-platform-backend.onrender.com`; // Adjust to your API base URL
      await axios.put(`${apiUrl}/api/tasks/${id}`, updatedTask);
      setEditingRow(null);
      // Optionally handle success feedback or update local state if needed
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const apiUrl = `https://pm-platform-backend.onrender.com`; // Adjust to your API base URL
      await axios.delete(`${apiUrl}/api/tasks/${id}`);
      setRows((prevRows) => prevRows.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const columns = [
    { field: 'taskName', headerName: 'Task Name', width: 180, editable: true },
    { field: 'startDate', headerName: 'Start Date', type: 'date', width: 180, editable: true },
    { field: 'endDate', headerName: 'End Date', type: 'date', width: 180, editable: true },
    { field: 'cost', headerName: 'Cost', type: 'number', width: 120, editable: true },
    { field: 'contributor', headerName: 'Contributor', width: 180, editable: true },
    { field: 'description', headerName: 'Description', width: 300, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      renderCell: (params) => (
        <div>
          {editingRow !== params.row.id ? (
            <>
              <Button
                startIcon={<EditIcon />}
                onClick={() => handleEditClick(params.row.id)}
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteClick(params.row.id)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<SaveIcon />}
                onClick={() => handleSaveClick(params.row.id)}
              >
                Save
              </Button>
              <Button
                startIcon={<CancelIcon />}
                onClick={() => setEditingRow(null)}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}

export default ProjectSettings;