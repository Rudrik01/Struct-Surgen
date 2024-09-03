import React, { useState } from "react";
import "./TaskFormPage.css";

function App() {
  const [srNo, setSrNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [form1, setForm1] = useState(null);
  const [annexure1, setAnnexure1] = useState(null);
  const [annexure3, setAnnexure3] = useState(null);
  const [partners, setPartners] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="app">
      <div className="main---container center">
        <div className="form-container">
          <img className="logo" src="\logo.png" alt="logo" />
          <h1 className="title">DOCUMENTS Form</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="srNo">
                SR. NO. *
              </label>
              <input
                className="input"
                type="text"
                id="srNo"
                value={srNo}
                onChange={(e) => setSrNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="companyName">
                COMPANY NAME
              </label>
              <input
                className="input"
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">FORM-1*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${form1 === true ? "active" : ""}`}
                  type="button"
                  onClick={() => setForm1(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${form1 === false ? "active" : ""}`}
                  type="button"
                  onClick={() => setForm1(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">ANNEXURE-1*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    annexure1 === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setAnnexure1(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    annexure1 === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setAnnexure1(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">ANNEXURE-3*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    annexure3 === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setAnnexure3(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    annexure3 === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setAnnexure3(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">LIST OF PARTNERS*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    partners === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setPartners(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    partners === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setPartners(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="button-group">
              <button className="action-button" type="submit">
                Next
              </button>
              <button className="action-button cancel-button" type="button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <img className="footer-icon" src="footer-icon.svg" alt="footer-icon" />
    </div>
  );
}

export default App;
