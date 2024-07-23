// src/components/TaskAllocationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskAllocationForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [companyName, setTaskDetails] = useState('');

  const handleAllocation = async () => {
    try {
      // Make a POST request to your backend endpoint for task allocation
      const response = await axios.post('/api/task/allocateCompanyName', {
        employeeId,
        companyName,
      });

      // Handle success
      console.log('Task allocated successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error allocating task:', error);
    }
  };

  return (
    <div>
      <h2>Task Allocation</h2>
      <label>
        Employee ID:
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
      </label>
      <br />
      <label>
        CompanyName:
        <textarea value={companyName} onChange={(e) => setTaskDetails(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAllocation}>Allocate Task</button>
    </div>
  );
};

export default TaskAllocationForm;
