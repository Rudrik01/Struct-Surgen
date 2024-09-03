import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import EmployeeForm from './Components/Register';
import AdminForm from './Components/addadmin';
import AdminDashboard from './Components/taskstat';
import TaskAssignment from './Components/TaskAssignment';
import ChangePassword from './Components/resetpassword';
import AdminHome from './Components/AdminHome';
import ProtectedRoute from './Components/ProtectedRoute';
import TaskDetail from './Components/TaskDetail';
import TaskAllocation from './Components/taskal';
import CompanyRegistration from './Components/CompanyRegistration';
import EmployeeDashboard from './Components/EmployeeDashboard';
import TaskForm from './Components/TaskForm';
import EmployeeProfile from './Components/EmployeeProfile';
import TaskTypePage from './Components/TaskTypePage';
import TaskFormPage from "./Components/TaskFormPage"
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/AdminHome" element={<ProtectedRoute element={AdminHome} roles={['admin']} />} />
      <Route path="/register" element={<ProtectedRoute element={EmployeeForm} roles={['admin']} />} />
      <Route path="/ChangePassword" element={<ProtectedRoute element={ChangePassword} />} />
      <Route path="/addadmin" element={<ProtectedRoute element={AdminForm} roles={['admin']} />} />
      <Route path="/AdminDashboard" element={<ProtectedRoute element={AdminDashboard} roles={['admin']} />} />
      <Route path="/TaskAssignment" element={<ProtectedRoute element={TaskAssignment} roles={['admin']} />} />
      <Route path="/company" element={<ProtectedRoute element={CompanyRegistration} roles={['admin']} />} />
      <Route path="/taskall" element={<ProtectedRoute element={TaskAllocation} roles={['admin']} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={EmployeeDashboard} />} />
      <Route path="/employee/tasks/:taskType" element={<ProtectedRoute element={TaskTypePage} />} />
      <Route path="/employee/task/:taskId/form" element={<ProtectedRoute element={TaskFormPage} />} />
      <Route path="/task/:taskId" element={<ProtectedRoute element={TaskForm} />} />
      <Route path="/employee/profile" element={<ProtectedRoute element={EmployeeProfile} />} />

      {/* Add other routes as needed */}
    </Routes>
  );
};

export default App;
