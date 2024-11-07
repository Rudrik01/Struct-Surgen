// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./TaskTypePage.css";

// const TaskTypePage = () => {
//   const { taskType } = useParams();
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const employeeId = localStorage.getItem("employeeId");
//         const response = await axios.get(
//           `http://localhost:5000/api/employee/tasks/${employeeId}/${taskType}/companies`
//         );
//         setCompanies(response.data);
  
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching companies", error);
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, [taskType]);

//   const handleCompanyClick = (taskId) => {
//     navigate(`/employee/task/${taskId}/form`);
//   };

//   return (
//     <div className="task-type-container">
//       <div className="header">
//         <h1>{taskType} Management</h1>
//         <p>
//           Choose a company from the list below to manage specific tasks related
//           to {taskType}.
//         </p>
//       </div>
//       {loading ? (
//         <div className="spinner-container">
//           <div className="spinner"></div>
//           <p>Loading companies...</p>
//         </div>
//       ) : (
//         <div className="content-container">
//           {companies.length > 0 ? (
//             companies.map((company) => (
//               <div
//                 key={company._id}
//                 className="company-card"
//                 onClick={() => handleCompanyClick(company._id)}
//               >
//                 <h3>{company.companyName}</h3>
//               </div>
//             ))
//           ) : (
//             <p>No companies available for this task type.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskTypePage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TaskTypePage.css";

const TaskTypePage = () => {
  const { taskType } = useParams();
  const[tasks,setTasks]=useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
   const type = taskType.trim(" ").toLowerCase()
  //  console.log("task type", type);

  //  if(type === "site visit"){
  //   navigate()
  //  }

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const employeeId = localStorage.getItem("employeeId");
        const response = await axios.get(
          `http://localhost:5000/api/employee/tasks/${employeeId}/${taskType}/companies`
        );
        console.log(response.data)
        setTasks(response.data.tasks)
        setCompanies(response.data.companies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [taskType]);

  const handleCompanyClick = (companyId, companyName, srNo, taskType) => {
    // Find the task related to the clicked company
    const taskForCompany = tasks.find(task => task.companyId._id === companyId);

    if (taskForCompany) {
      const taskId = taskForCompany._id; // Get the task ID

      console.log("taskId:", taskId);
      console.log("companyId:", companyId);
      console.log("companyName:", companyName);
      console.log("srNo:", srNo);
      console.log("task type", taskType)

      if (taskType === "Documents") {
        navigate("/document-form", {
          state: { companyName, srNo, taskId },
        });
      }

      if(taskType === "Site Visit"){
        navigate("/siteVisit-form", {
          state: { companyName, srNo, taskId },
        });
      }

      if(taskType === "License"){
        navigate("/license-form", {
          state:{companyName, srNo, taskId}
        })
      }

      if(taskType === "Drawing"){
        navigate("/drawing-upload", {
          state: {companyName, srNo, taskId},
        });
      }

      // Navigate to the next page with taskId and company details
      // navigate(`/employee/task/${companyId}/form`, {
      //   state: { companyName, srNo, taskId }, // Pass company name and taskId through state
      // });
    } else {
      console.error("Task not found for the selected company.");
    }
  };

  return (
    <div className="task-type-container">
      <div className="header">
        <h1>{taskType} Management</h1>
        <p>
          Choose a company from the list below to manage specific tasks related
          to {taskType}.
        </p>
      </div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading companies...</p>
        </div>
      ) : (
        <div className="content-container">
          {companies.length > 0? (
            companies.map((company) => (
              <div
                key={company._id}
                className="company-card"
                onClick={() => handleCompanyClick(company._id, company.companyName,company.srNo, taskType)}
              >
                <h3>{company.companyName}</h3>
              </div>
            ))
          ) : (
            <p>No companies available for this task type.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskTypePage;
