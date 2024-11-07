// import React, { useState } from "react";
// import axios from "axios"; // Import axios for sending data
// import "./TaskFormPage.css";

// function App() {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     companyName: "",
//     form1: null,
//     annexure1: null,
//     annexure3: null,
//     partners: null,
//     onsiteEMGPlan: null,
//     rmFm: null,
//     frocessChart: null,
//     brifeDis: null,
//     labourCess: null,
//     fireLoad: null,
//     ownership: null,
//     gpcb: null,
//     annexure4_6: null,
//     shedual7: null,
//     fireLoad17: null,
//     partnership: null,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Convert null values to 'No' if required
//     const formattedData = { ...formData };
//     Object.keys(formData).forEach(key => {
//       if (formData[key] === null) {
//         formattedData[key] = "No";
//       } else {
//         formattedData[key] = formData[key] ? "Yes" : "No";
//       }
//     });
//     console.log(formattedData)
//     console.log(formData)
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   return (
//     <div className="main---container center">
//       <div className="form-container">
//         <img className="logo" src="\logo.png" alt="logo" />
//         <h1 className="title">DOCUMENTS Form</h1>

//         <form onSubmit={handleSubmit}>
//           {/* SR. NO */}
//           <div className="form-group">
//             <label className="label" htmlFor="srNo">
//               SR. NO. *
//             </label>
//             <input
//               className="input"
//               type="text"
//               id="srNo"
//               value={formData.srNo}
//               onChange={(e) => handleInputChange("srNo", e.target.value)}
//               required
//             />
//           </div>

//           {/* COMPANY NAME */}
//           <div className="form-group">
//             <label className="label" htmlFor="companyName">
//               COMPANY NAME
//             </label>
//             <input
//               className="input"
//               type="text"
//               id="companyName"
//               value={formData.companyName}
//               onChange={(e) => handleInputChange("companyName", e.target.value)}
//               required
//             />
//           </div>

//           {/* FORM-1 */}
//           <div className="form-group">
//             <label className="label">FORM-1*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.form1 === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("form1", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.form1 === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("form1", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* ANNEXURE-1 */}
//           <div className="form-group">
//             <label className="label">ANNEXURE-1*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.annexure1 === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("annexure1", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.annexure1 === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("annexure1", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* ANNEXURE-3 */}
//           <div className="form-group">
//             <label className="label">ANNEXURE-3*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.annexure3 === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("annexure3", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.annexure3 === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("annexure3", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* PARTNERS */}
//           <div className="form-group">
//             <label className="label">PARTNERS*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.partners === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("partners", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.partners === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("partners", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* ONSITE EMG PLAN */}
//           <div className="form-group">
//             <label className="label">ONSITE EMG PLAN*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.onsiteEMGPlan === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("onsiteEMGPlan", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.onsiteEMGPlan === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("onsiteEMGPlan", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* RM/FM */}
//           <div className="form-group">
//             <label className="label">RM/FM*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.rmFm === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("rmFm", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.rmFm === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("rmFm", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* PROCESS CHART */}
//           <div className="form-group">
//             <label className="label">PROCESS CHART*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.frocessChart === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("frocessChart", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.frocessChart === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("frocessChart", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* BRIEF DESCRIPTION */}
//           <div className="form-group">
//             <label className="label">BRIEF DESCRIPTION*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.brifeDis === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("brifeDis", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.brifeDis === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("brifeDis", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* LABOUR CESS */}
//           <div className="form-group">
//             <label className="label">LABOUR CESS*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.labourCess === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("labourCess", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.labourCess === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("labourCess", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* FIRE LOAD */}
//           <div className="form-group">
//             <label className="label">FIRE LOAD*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.fireLoad === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("fireLoad", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.fireLoad === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("fireLoad", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* OWNERSHIP */}
//           <div className="form-group">
//             <label className="label">OWNERSHIP*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.ownership === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("ownership", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.ownership === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("ownership", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* GPCB */}
//           <div className="form-group">
//             <label className="label">GPCB*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.gpcb === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("gpcb", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.gpcb === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("gpcb", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* ANNEXURE 4-6 */}
//           <div className="form-group">
//             <label className="label">ANNEXURE 4-6*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.annexure4_6 === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("annexure4_6", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.annexure4_6 === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("annexure4_6", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* SCHEDULE 7 */}
//           <div className="form-group">
//             <label className="label">SCHEDULE 7*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.shedual7 === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("shedual7", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.shedual7 === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("shedual7", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* FIRE LOAD 17 */}
//           <div className="form-group">
//             <label className="label">FIRE LOAD 17*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.fireLoad17 === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("fireLoad17", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.fireLoad17 === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("fireLoad17", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* PARTNERSHIP */}
//           <div className="form-group">
//             <label className="label">PARTNERSHIP*</label>
//             <div className="button-group">
//               <button
//                 className={`choice-button ${formData.partnership === true ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("partnership", true)}
//               >
//                 Yes
//               </button>
//               <button
//                 className={`choice-button ${formData.partnership === false ? "active" : ""}`}
//                 type="button"
//                 onClick={() => handleInputChange("partnership", false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>

//           {/* SUBMIT BUTTON */}
//           <button type="submit" className="submit-button">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import axios from "axios"; // Import axios for sending data
import "./DocuementFormPage.css";
import { useLocation } from "react-router-dom";

function DocuementFormPage() {
  const location = useLocation();
  const { companyName, srNo,taskId } = location.state || {};
  
  const [formData, setFormData] = useState({
    companyName: "",
    srNo: "",
    form1: null,
    annexure1: null,
    annexure3: null,
    partners: null,
    onsiteEMGPlan: null,
    rmFm: null,
    frocessChart: null,
    brifeDis: null,
    labourCess: null,
    fireLoad: null,
    ownership: null,
    gpcb: null,
    annexure4_6: null,
    shedual7: null,
    fireLoad17: null,
    partnership: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert null values to 'No' if required
    const formattedData = { ...formData };
    Object.keys(formData).forEach((key) => {
      if (key !== "srNo" && key !== "companyName") {
        // Convert null values to 'No' and truthy values to 'Yes'
        formattedData[key] = formData[key] === null ? "No" : formData[key] ? "Yes" : "No";
      }
      
    });

    // Prepare the payload including taskId
    const payload = {
      formData:formattedData,
      completed: true
    };
    console.log(payload)

    // API call to send the form data
    axios
      .put(`http://localhost:5000/api/employee/ta/${taskId}`, payload)
      .then((response) => {
        console.log("Data submitted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error submitting data", error);
      });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="main---container center">
      <div className="form-container">
        <img className="logo" src="\logo.png" alt="logo" />
        <h1 className="title">DOCUMENTS Form</h1>

        <form onSubmit={handleSubmit}>
          {/* SR. NO */}
          <div className="form-group">
            <label className="label" htmlFor="srNo">
              SR. NO. *
            </label>
            <input
              className="input"
              type="text"
              id="srNo"
              value={srNo || ""}
              readOnly
            />
          </div>

          {/* COMPANY NAME */}
          {/* <div className="form-group">
            <label className="label" htmlFor="companyName">
              COMPANY NAME
            </label>
            <input
              className="input"
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
            />
          </div> */}
           {/* Company Name (non-editable) */}
        <div className="form-group">
          <label className="label" htmlFor="companyName">Company Name</label>
          <input
            className="input non-editable-input"
            id="companyName"
            type="text"
            value={companyName || ""}
            readOnly
          />
        </div>

          {/* FORM-1 */}
          <div className="form-group">
            <label className="label">FORM-1*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.form1 === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("form1", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.form1 === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("form1", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* ANNEXURE-1 */}
          <div className="form-group">
            <label className="label">ANNEXURE-1*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.annexure1 === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("annexure1", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.annexure1 === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("annexure1", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* ANNEXURE-3 */}
          <div className="form-group">
            <label className="label">ANNEXURE-3*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.annexure3 === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("annexure3", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.annexure3 === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("annexure3", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* PARTNERS */}
          <div className="form-group">
            <label className="label">PARTNERS*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.partners === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("partners", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.partners === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("partners", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* ONSITE EMG PLAN */}
          <div className="form-group">
            <label className="label">ONSITE EMG PLAN*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.onsiteEMGPlan === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("onsiteEMGPlan", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.onsiteEMGPlan === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("onsiteEMGPlan", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* RM/FM */}
          <div className="form-group">
            <label className="label">RM/FM*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.rmFm === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("rmFm", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.rmFm === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("rmFm", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* PROCESS CHART */}
          <div className="form-group">
            <label className="label">PROCESS CHART*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.frocessChart === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("frocessChart", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.frocessChart === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("frocessChart", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* BRIEF DESCRIPTION */}
          <div className="form-group">
            <label className="label">BRIEF DESCRIPTION*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.brifeDis === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("brifeDis", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.brifeDis === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("brifeDis", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* LABOUR CESS */}
          <div className="form-group">
            <label className="label">LABOUR CESS*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.labourCess === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("labourCess", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.labourCess === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("labourCess", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* FIRE LOAD */}
          <div className="form-group">
            <label className="label">FIRE LOAD*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.fireLoad === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("fireLoad", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.fireLoad === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("fireLoad", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* OWNERSHIP */}
          <div className="form-group">
            <label className="label">OWNERSHIP*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.ownership === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("ownership", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.ownership === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("ownership", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* GPCB */}
          <div className="form-group">
            <label className="label">GPCB*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.gpcb === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("gpcb", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.gpcb === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("gpcb", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* ANNEXURE 4-6 */}
          <div className="form-group">
            <label className="label">ANNEXURE 4-6*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.annexure4_6 === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("annexure4_6", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.annexure4_6 === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("annexure4_6", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* SCHEDULE 7 */}
          <div className="form-group">
            <label className="label">SCHEDULE 7*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.shedual7 === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("shedual7", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.shedual7 === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("shedual7", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* FIRE LOAD 17 */}
          <div className="form-group">
            <label className="label">FIRE LOAD 17*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.fireLoad17 === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("fireLoad17", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.fireLoad17 === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("fireLoad17", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* PARTNERSHIP */}
          <div className="form-group">
            <label className="label">PARTNERSHIP*</label>
            <div className="button-group">
              <button
                className={`choice-button ${formData.partnership === true ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("partnership", true)}
              >
                Yes
              </button>
              <button
                className={`choice-button ${formData.partnership === false ? "active" : ""}`}
                type="button"
                onClick={() => handleInputChange("partnership", false)}
              >
                No
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DocuementFormPage;
