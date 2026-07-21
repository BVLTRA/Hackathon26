import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlowOrbs from "../components/GlowOrb";
import "./ReportIssue.css";

import logo from "../assets/images/logo.svg"; 

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div
        className={`custom-select-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "selected-value" : "placeholder-value"}>
          {value || placeholder}
        </span>
        <svg
          className={`chevron ${isOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {isOpen && (
        <div className="custom-select-menu">
          {options.map((opt) => (
            <div
              key={opt}
              className={`custom-select-option ${value === opt ? "selected" : ""}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReportIssue = () => {
  const navigate = useNavigate();
  const dateInputRef = useRef(null); // The reference for the date picker fix
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    issueType: "Engineering", // Default selection
    title: "",
    tagId: "",
    severity: "",
    branch: "",
    area: "",
    shift: "",
    equipment: "",
    date: "",
    description: "",
    actionTaken: "",
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("gridlock_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  };
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payload ready for dispatch:", { ...formData, file });
  };

  return (
    <div className="dashboard-layout">
      <GlowOrbs />

      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="Relay Logo" className="brand-logo" height="15" />
          <span className="brand-text">RELAY</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate("/dashboard")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            Dashboard
          </button>
          <button
            className="nav-item active"
            onClick={() => navigate("/report-issue")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Report Issue
          </button>
          <button className="nav-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect x="4" y="8" width="16" height="14" rx="2"></rect>
              <path d="M9 14h6"></path>
              <path d="M9 18h6"></path>
              <path d="M12 11v8"></path>
            </svg>
            All Reports
          </button>
          <button className="nav-item" onClick={() => navigate('/analytics')}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            Analytics
          </button>
          <button className="nav-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </button>
        </nav>
        <div className="sidebar-user">
          <div className="user-avatar">{user ? user.name.charAt(0) : "U"}</div>
          <div className="user-info">
            <span className="user-name">
              {user ? `${user.name} ${user.surname}` : "User"}
            </span>
          </div>
          <button className="logout-icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </aside>

      <main className="main-viewport">
        <header className="viewport-header">
          <h1 className="current-page-title">Report Issue</h1>
        </header>

        <section className="content-canvas">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Report Issue</h2>
              <p>
                Log a new system or hardware anomaly into the central database.
              </p>
            </div>

            <form className="report-form" onSubmit={handleSubmit}>
              {/* RADIO GROUP FOR ISSUE TYPE */}
              <div className="form-group full-width">
                <label>Issue Type</label>
                <div className="radio-group-container">
                  {["SHEQ", "Engineering", "Operations"].map((type) => (
                    <label
                      key={type}
                      className={`custom-radio-label ${formData.issueType === type ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="issueType"
                        value={type}
                        checked={formData.issueType === type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            issueType: e.target.value,
                          })
                        }
                        className="hidden-radio"
                      />
                      <div className="radio-circle"></div>
                      <span className="radio-text">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ASYMMETRICAL GRID FOR TITLE AND TAG ID */}
              <div className="form-row title-tag-row">
                <div className="form-group title-col">
                  <label>Issue Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Conveyor belt motor overheating"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group tag-col">
                  <label>Tag ID</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. TG-0492"
                    value={formData.tagId}
                    onChange={(e) =>
                      setFormData({ ...formData, tagId: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Severity Level</label>
                  <CustomSelect
                    placeholder="Assign severity..."
                    options={["Low", "Medium", "High", "Critical"]}
                    value={formData.severity}
                    onChange={(val) =>
                      setFormData({ ...formData, severity: val })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Operational Branch</label>
                  <CustomSelect
                    placeholder="Select facility..."
                    options={[
                      "Rosslyn Brewery",
                      "Alrode Brewery",
                      "Chamdor Brewery",
                      "Newlands Brewery",
                      "Prospecton Brewery",
                      "Ibhayi Brewery",
                      "Polokwane Brewery",
                    ]}
                    value={formData.branch}
                    onChange={(val) =>
                      setFormData({ ...formData, branch: val })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Area / Zone</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Brewhouse, Packaging Line 2"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Shift</label>
                  <CustomSelect
                    placeholder="Select shift..."
                    options={[
                      "Shift A (Morning)",
                      "Shift B (Afternoon)",
                      "Shift C (Night)",
                      "General Operations",
                    ]}
                    value={formData.shift}
                    onChange={(val) => setFormData({ ...formData, shift: val })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Equipment / Asset</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Filler Head A, Palletizer 3"
                    value={formData.equipment}
                    onChange={(e) =>
                      setFormData({ ...formData, equipment: e.target.value })
                    }
                  />
                </div>

                {/* THE FIXED DATE PICKER */}
                <div className="form-group">
                  <label>Date of Incident</label>
                  {/* Clicking this wrapper explicitly fires the showPicker() command on the hidden input node */}
                  <div
                    className="date-input-wrapper"
                    onClick={() =>
                      dateInputRef.current && dateInputRef.current.showPicker()
                    }
                  >
                    <input
                      ref={dateInputRef}
                      type="date"
                      className="form-input date-input"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                    <svg
                      className="calendar-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Problem / Defect Description</label>
                <textarea
                  className="form-input textarea"
                  placeholder="Provide mechanical specifics, error codes, or observed behavior..."
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-group full-width">
                <label>Description of Action to be Taken</label>
                <textarea
                  className="form-input textarea"
                  placeholder="Outline the intended repair steps, isolations required, or immediate mitigations..."
                  rows="3"
                  value={formData.actionTaken}
                  onChange={(e) =>
                    setFormData({ ...formData, actionTaken: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-group full-width">
                <label>Image of Issue (Optional)</label>
                <div
                  className={`drag-drop-zone ${isDragging ? "drag-active" : ""} ${previewUrl ? "has-image" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileSelect}
                    hidden
                  />
                  {previewUrl ? (
                    <div className="preview-container">
                      <img
                        src={previewUrl}
                        alt="Fault preview"
                        className="image-preview"
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="file-upload" className="drag-drop-content">
                      <div className="upload-icon-wrapper">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <span className="upload-title">
                        Click to upload or drag and drop
                      </span>
                      <span className="upload-subtitle">
                        SVG, PNG, JPG or GIF (max. 5MB)
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReportIssue;
