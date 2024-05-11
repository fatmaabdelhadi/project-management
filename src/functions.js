import axios from 'axios'
import React, {useState, useEffect} from 'react'


export const fixDateFormat = (date) => {
  // If date is NaN or null, return an empty string or placeholder
  if (isNaN(Date.parse(date)) || date === null) {
    return ""; // Or return a placeholder like "N/A"
  }

  // Parse the input date
  const parsedDate = new Date(date);
  
  // Extract day, month, and year components
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = parsedDate.getFullYear();
  
  // Format the date as "dd-mm-yyyy"
  const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

  return formattedDate;
}

// Calculate Days Left
export const calculateDaysLeft = (endDate) => {
        const currentDate = new Date();
        const dueDateTime = new Date((endDate)).getTime();
        const differenceInMs = dueDateTime - currentDate.getTime();
        const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
        if (daysLeft < 0)
            return 0
        return daysLeft;
    }


// Get/post/.. any SINGLE attribute
export function GetForiegnData({ object, method, id, attr }) { // Destructure projectId from props
    const [projectName, setProjectName] = useState(null);
    id = '6629441119d2130518b601a4'
    useEffect(() => {
        const getDataFromProject = async () => {
            // No need to modify projectId within the component
            const url = `https://pm-platform-backend.onrender.com/api/${object}/${method}/${id}`;
            try {
                const response = await axios.get(url);
                const data = response.data;
                setProjectName(data[attr]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setProjectName(null);
            }
        };

        getDataFromProject();
    }); // Include projectId in the dependency array

    return (
        <>{projectName}</>
    );
}