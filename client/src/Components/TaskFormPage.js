import React, { useState } from "react";
import "./TaskFormPage.css";

function App() {
  const [srNo, setSrNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [form1, setForm1] = useState(null);
  const [annexure1, setAnnexure1] = useState(null);
  const [annexure3, setAnnexure3] = useState(null);
  const [partners, setPartners] = useState(null);
  const [Onsite_EMG_PLAN, setOnsite_EMG_PLAN] = useState(null)
  const [RM_FM, setRM_FM] = useState(null)
  const [Frocess_Chart, setFrocess_Chart] = useState(null)
  const [BrifeDis, setBrifeDis] = useState(null)
  const [Labour_Cess, setLabour_Cess] = useState(null)
  const [FireLoad, setFireLoad] = useState(null)
  const [Ownership, setOwnership] = useState(null)
  const [Gpcb, setGpcb] = useState(null)
  const [Annexure4_6, setAnnexure4_6] = useState(null)
  const [Shedual_7, setShedual_7] = useState(null)
  const [FireLoad_17, setFireLoad_17] = useState(null)
  const [Partnership, setPartnership] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
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

            <div className="form-group">
              <label className="label">ONSITE EMG. PLAN*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    Onsite_EMG_PLAN === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setOnsite_EMG_PLAN(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Onsite_EMG_PLAN === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setOnsite_EMG_PLAN(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">RM/FM*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${RM_FM === true ? "active" : ""}`}
                  type="button"
                  onClick={() => setRM_FM(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${RM_FM === false ? "active" : ""}`}
                  type="button"
                  onClick={() => setRM_FM(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">FROCESS CHART*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    Frocess_Chart === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setFrocess_Chart(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Frocess_Chart === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setFrocess_Chart(false)}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="label">BRIFE DIS*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    BrifeDis === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setBrifeDis(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    BrifeDis === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setBrifeDis(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">LABOUR CESS*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    Labour_Cess === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setLabour_Cess(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Labour_Cess === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setLabour_Cess(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">FIRE LOAD*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    FireLoad === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setFireLoad(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Labour_Cess === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setFireLoad(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">OWNERSHIP*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    Ownership === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setOwnership(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Labour_Cess === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setOwnership(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="label">GPCB*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${Gpcb === true ? "active" : ""}`}
                  type="button"
                  onClick={() => setGpcb(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${Gpcb === false ? "active" : ""}`}
                  type="button"
                  onClick={() => setGpcb(false)}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="label">ANNEXURE-4/6*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    Annexure4_6 === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setAnnexure4_6(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Annexure4_6 === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setAnnexure4_6(false)}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="label">SHEDUAL-7*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    Shedual_7 === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setShedual_7(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Shedual_7 === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setShedual_7(false)}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="label">FIRE LOAD_17*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    FireLoad_17 === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setFireLoad_17(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Labour_Cess === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setFireLoad_17(false)}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="label">PARTNERSHIP*</label>
              <div className="button-group">
                <button
                  className={`choice-button ${
                    Partnership === true ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setPartnership(true)}
                >
                  Yes
                </button>
                <button
                  className={`choice-button ${
                    Partnership === false ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setPartnership(false)}
                >
                  No
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

  );
}

export default App;
