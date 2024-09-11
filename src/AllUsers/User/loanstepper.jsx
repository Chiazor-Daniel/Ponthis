import React, { useState } from 'react';

const formData = [
  {
    title: "Loan Details",
    fields: [
      { name: "loanPurpose", label: "Purpose of Loan", type: "select", options: ["Home Improvement", "Debt Consolidation", "Business", "Education", "Vehicle", "Other"] },
      { name: "amount", label: "Loan Amount", type: "select", options: ["$1,000 - $5,000", "$5,001 - $10,000", "$10,001 - $25,000", "$25,001 - $50,000", "Over $50,000"] },
      { name: "repaymentDuration", label: "Repayment Duration", type: "select", options: ["6 months", "12 months", "24 months", "36 months", "48 months", "60 months"] }
    ]
  },
  {
    title: "Personal Information",
    fields: [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "address", label: "Address", type: "text" },
      { name: "dob", label: "Date of Birth", type: "date" },
      { name: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"] }
    ]
  },
  {
    title: "Property Information",
    fields: [
      { name: "isHomeOwner", label: "Are you a home owner?", type: "radio", options: ["Yes", "No"] },
      { name: "hasMortgage", label: "Do you have a mortgage?", type: "radio", options: ["Yes", "No"] },
      { name: "yearsAtAddress", label: "How many years have you lived at this address?", type: "number" }
    ]
  },
  {
    title: "Employment Information",
    fields: [
      { name: "employmentStatus", label: "Employment Status", type: "select", options: ["Employed", "Self-Employed", "Unemployed", "Retired"] },
      { name: "jobTitle", label: "What job do you do?", type: "text" },
      { name: "industry", label: "What industry do you work in?", type: "text" },
      { name: "employerName", label: "Name of employer", type: "text" }
    ]
  },
  {
    title: "Financial Information",
    fields: [
      { name: "annualIncome", label: "Annual income before tax", type: "number" },
      { name: "hasOtherIncome", label: "Do you have any other household income?", type: "radio", options: ["Yes", "No"] },
      { name: "otherIncomeAmount", label: "How much other annual household income do you have?", type: "number" },
      { name: "dependents", label: "How many people depend on you financially?", type: "number" }
    ]
  },
  {
    title: "Credit Information",
    fields: [
      { name: "creditScore", label: "Estimated Credit Score", type: "select", options: ["Excellent (750+)", "Good (700-749)", "Fair (650-699)", "Poor (Below 650)", "Don't Know"] },
      { name: "hasBankruptcy", label: "Have you declared bankruptcy in the last 7 years?", type: "radio", options: ["Yes", "No"] },
      { name: "hasDefaulted", label: "Have you defaulted on a loan in the last 3 years?", type: "radio", options: ["Yes", "No"] }
    ]
  },
  {
    title: "Bank Information",
    fields: [
      { name: "bankName", label: "Bank Name", type: "text" },
      { name: "accountType", label: "Account Type", type: "select", options: ["Checking", "Savings"] },
      { name: "accountNumber", label: "Account Number", type: "text" },
      { name: "routingNumber", label: "Routing Number", type: "text" }
    ]
  },
  {
    title: "References",
    fields: [
      { name: "ref1Name", label: "Reference 1 Name", type: "text" },
      { name: "ref1Relation", label: "Relationship to Reference 1", type: "text" },
      { name: "ref1Phone", label: "Reference 1 Phone Number", type: "tel" },
      { name: "ref2Name", label: "Reference 2 Name", type: "text" },
      { name: "ref2Relation", label: "Relationship to Reference 2", type: "text" },
      { name: "ref2Phone", label: "Reference 2 Phone Number", type: "tel" }
    ]
  },
  {
    title: "Additional Documents",
    fields: [
      { name: "idDocument", label: "Upload Government-issued ID", type: "file" },
      { name: "proofOfIncome", label: "Upload Proof of Income", type: "file" },
      { name: "bankStatements", label: "Upload Last 3 Months of Bank Statements", type: "file" }
    ]
  },
  {
    title: "Review and Submit",
    fields: [
      { name: "termsAgreement", label: "I agree to the terms and conditions", type: "checkbox" },
      { name: "privacyAgreement", label: "I agree to the privacy policy", type: "checkbox" }
    ]
  }
];

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#C96868',
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#C96868',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  radioOption: {
    marginBottom: '5px',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  footer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#000',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
};

const LoanApplicationStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
      case 'tel':
        return (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.label} htmlFor={field.name}>{field.label}</label>
            <input
              style={styles.input}
              type={field.type}
              id={field.name}
              name={field.name}
              value={formState[field.name] || ''}
              onChange={handleInputChange}
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.label} htmlFor={field.name}>{field.label}</label>
            <select
              style={styles.select}
              id={field.name}
              name={field.name}
              value={formState[field.name] || ''}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.label}>{field.label}</label>
            <div style={styles.radioGroup}>
              {field.options.map(option => (
                <div key={option} style={styles.radioOption}>
                  <input
                    type="radio"
                    id={`${field.name}-${option}`}
                    name={field.name}
                    value={option}
                    checked={formState[field.name] === option}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`${field.name}-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                name={field.name}
                checked={formState[field.name] || false}
                onChange={handleInputChange}
              />
              {field.label}
            </label>
          </div>
        );
      case 'file':
        return (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.label} htmlFor={field.name}>{field.label}</label>
            <input
              style={styles.input}
              type="file"
              id={field.name}
              name={field.name}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < formData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formState);
    // Here you would typically send the form data to a server
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Loan Application - Step {currentStep + 1} of {formData.length}</h1>
        </div>
        <div>
          <h2 style={styles.stepTitle}>{formData[currentStep].title}</h2>
          {formData[currentStep].fields.map(renderField)}
        </div>
        <div style={styles.footer}>
          <button
            style={{...styles.button, ...(currentStep === 0 ? styles.disabledButton : {})}}
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {currentStep === formData.length - 1 ? (
            <button style={styles.button} onClick={handleSubmit}>Submit</button>
          ) : (
            <button style={styles.button} onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationStepper;