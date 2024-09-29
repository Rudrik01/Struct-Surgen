// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './FormStatusPage.css'; // Assuming custom styling

// function FormStatusPage() {
//   const { taskId } = useParams();
//   const [taskDetails, setTaskDetails] = useState(null);

//   useEffect(() => {
//     // Fetch task details by task ID
//     axios.get(`http://localhost:5000/api/admin/task/${taskId}`)
//       .then(response => setTaskDetails(response.data))
//       .catch(error => console.error('Error fetching task details:', error));
//   }, [taskId]);

//   if (!taskDetails) {
//     return <div>Loading task details...</div>;
//   }

//   const { companyId, formData, status, taskType } = taskDetails;

//   return (
//     <div className="form-status-page">
//       <h1>Task Details for {companyId.companyName}</h1>
//       <div className="task-info">
//         <div className="task-field">
//           <label>Task Type:</label>
//           <span>{taskType}</span>
//         </div>
//         <div className="task-field">
//           <label>Status:</label>
//           <span>{status}</span>
//         </div>
//       </div>

//       <h2>Form Details</h2>
//       <div className="form-data">
//         {Object.keys(formData).map(key => (
//           <div key={key} className="form-field">
//             <label>{key}:</label>
//             <span>{formData[key]}</span>
//           </div>
//         ))}
//       </div>

      
//     </div>
//   );
// }

// export default FormStatusPage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FormStatusPage.css'; // Assuming custom styling


function FormStatusPage() {
  const { taskId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    // Fetch task details by task ID
    axios.get(`http://localhost:5000/api/admin/task/${taskId}`)
      .then(response => setTaskDetails(response.data))
      .catch(error => console.error('Error fetching task details:', error));
  }, [taskId]);

  if (!taskDetails) {
    return <div>Loading task details...</div>;
  }

  const { companyId, formData, status, taskType } = taskDetails;

  return (
    <div className="form-status-page">
      {/* Logo and Title */}
      <div className="logo-container">
        <img src='/logo.png' alt="Struct Surgen Logo" className="logo" />
       
      </div>

     
      <h1>DOCUMENTS Form</h1>
     {/* Form Data */}
<h2>Form Details</h2>
<div className="form-data">
  {/* Print companyName and srNo first */}
  <div className="form-field">
    <label>SR NO:</label>
    <div className="task-input">{formData.srNo}</div>
  </div>
  <div className="form-field">
    <label>COMPANY NAME:</label>
    <div className="task-input">{formData.companyName}</div>
  </div>
 

  {/* Print the rest of the form fields */}
  {Object.keys(formData)
    .filter(key => key !== "companyName" && key !== "srNo") // Filter out companyName and srNo
    .map(key => (
      <div key={key} className="form-field">
        <label>{key.replace('_', ' ').toUpperCase()}:</label>
        <div className="task-input">{formData[key]}</div>
      </div>
    ))}
</div>

    </div>
  );
}

export default FormStatusPage;
