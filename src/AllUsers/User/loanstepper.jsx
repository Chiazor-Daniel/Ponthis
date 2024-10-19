import React, { useState } from 'react';
import { Check, CreditCard, User, Home, Briefcase, DollarSign } from 'lucide-react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const formData = [
  {
    title: "Loan Details",
    icon: <CreditCard className="w-6 h-6" />,
    fields: [
      { name: "purpose", label: "Purpose of Loan", type: "select", options: ["Home Improvement", "Debt Consolidation", "Business", "Education", "Vehicle", "Other"] },
      { name: "amount", label: "Loan Amount", type: "number" },
      { name: "repayment_duration_weeks", label: "Repayment Duration (weeks)", type: "number" },
      { name: "payment_type", label: "Payment Type", type: "select", options: ["one-time payment", "installment"] }
    ]
  },
  {
    title: "Personal Information",
    icon: <User className="w-6 h-6" />,
    fields: [
      { name: "full_name", label: "Full Name", type: "text" },
      { name: "address", label: "Address", type: "text" },
      { name: "dob", label: "Date of Birth", type: "date" },
      { name: "marital_status", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"] }
    ]
  },
  {
    title: "Property Information",
    icon: <Home className="w-6 h-6" />,
    fields: [
      { name: "is_home_owner", label: "Are you a home owner?", type: "select", options: ["Yes", "No"] },
      { name: "has_mortgage", label: "Do you have a mortgage?", type: "select", options: ["Yes", "No"] },
      { name: "years_at_address", label: "Years at Address", type: "number" }
    ]
  },
  {
    title: "Employment Information",
    icon: <Briefcase className="w-6 h-6" />,
    fields: [
      { name: "employment_status", label: "Employment Status", type: "select", options: ["Employed", "Self-Employed", "Unemployed", "Retired"] },
      { name: "job_title", label: "Job Title", type: "text" },
      { name: "industry", label: "Industry", type: "text" },
      { name: "employer_name", label: "Employer Name", type: "text" }
    ]
  },
  {
    title: "Financial Information",
    icon: <DollarSign className="w-6 h-6" />,
    fields: [
      { name: "annual_income", label: "Annual Income (before tax)", type: "number" },
      { name: "has_other_household_income", label: "Other Household Income?", type: "select", options: ["Yes", "No"] },
      { name: "other_annual_household_income", label: "Other Annual Household Income", type: "number" },
      { name: "number_of_dependents", label: "Number of Dependents", type: "number" }
    ]
  }
];

const defaultState = {
  purpose: "",
  amount: "",
  repayment_duration_weeks: "",
  payment_type: "",
  full_name: "",
  address: "",
  dob: "",
  marital_status: "",
  is_home_owner: "",
  has_mortgage: "",
  years_at_address: "",
  employment_status: "",
  job_title: "",
  industry: "",
  employer_name: "",
  annual_income: "",
  has_other_household_income: "",
  other_annual_household_income: "",
  number_of_dependents: ""
};

export default function LoanApplicationStepper({ userToken, onClose, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState(defaultState);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const validateStep = () => {
    const currentFields = formData[currentStep].fields;
    return currentFields.every(field => {
      const value = formState[field.name];
      return value !== undefined && value !== '';
    });
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, formData.length - 1));
      setError(null);
    } else {
      setError('Please fill in all fields before proceeding.');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      setError('Please fill in all fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Transform the data as per the original requirements
      const transformedData = {
        purpose: formState.purpose,
        amount: Number(formState.amount),
        repayment_duration_weeks: Number(formState.repayment_duration_weeks),
        payment_type: formState.payment_type,
        full_name: formState.full_name,
        address: formState.address,
        dob: formState.dob,
        marital_status: formState.marital_status,
        is_home_owner: formState.is_home_owner === "Yes",
        has_mortgage: formState.has_mortgage === "Yes",
        years_at_address: Number(formState.years_at_address),
        employment_status: formState.employment_status,
        job_title: formState.job_title,
        industry: formState.industry,
        employer_name: formState.employer_name,
        annual_income: Number(formState.annual_income),
        has_other_household_income: formState.has_other_household_income === "Yes",
        other_annual_household_income: Number(formState.other_annual_household_income),
        number_of_dependents: Number(formState.number_of_dependents)
      };

      const response = await axios.post(
        'https://api.ledgersafe-ai.com/user/loan/make-loan-request/',
        transformedData,
        {
          headers: {
            'x-token': userToken,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === "error") {
        throw new Error(response.data.message || 'Failed to submit loan application');
      }

      // Show success message
      onSuccess?.();
      onClose();

    } catch (err) {
      console.error('Error submitting loan request:', err);
      setError(err.message || 'Failed to submit loan application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const renderField = ({ name, label, type, options }) => {
    const baseStyle = {
      width: '100%',
      padding: '8px',
      backgroundColor: '#2d3748', // Corresponds to bg-gray-800
      border: '1px solid #4a5568', // Corresponds to border-gray-700
      borderRadius: '4px', // Corresponds to rounded-md
      color: '#ffffff', // Corresponds to text-white
    };
  
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            value={formState[name]}
            onChange={handleInputChange}
            style={baseStyle}
          >
            <option value="">Select...</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            value={formState[name]}
            onChange={handleInputChange}
            style={baseStyle}
            min={type === 'number' ? "0" : undefined}
          />
        );
    }
  };
  

  return (
    <div style={{ backgroundColor: '#2a2a2a', color: '#FFFFFF', padding: '24px', borderRadius: '8px',  width: '100%' }}>
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        {formData.map((step, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              backgroundColor: index === currentStep ? '#18A594' : index < currentStep ? '#10B981' : '#374151'
            }}>
              {index < currentStep ? <Check style={{ width: '24px', height: '24px' }} /> : step.icon}
            </div>
            <span style={{ fontSize: '12px', textAlign: 'center' }}>{step.title}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>{formData[currentStep].title}</h2>
      <div style={{ marginBottom: '16px' }}>
        {formData[currentStep].fields.map(field => (
          <div key={field.name} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium' }}>{field.label}</label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>

    {error && (
      <Alert variant="danger" style={{ marginBottom: '16px' }}>
        {error}
      </Alert>
    )}

    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        onClick={handlePrevious}
        disabled={currentStep === 0 || isSubmitting}
        style={{
          padding: '8px 16px',
          backgroundColor: '#374151',
          border: 'none', 
          color: "white",
          borderRadius: '4px',
          opacity: currentStep === 0 || isSubmitting ? 0.5 : 1,
          cursor: currentStep === 0 || isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        Previous
      </button>
      
      {currentStep === formData.length - 1 ? (
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            color:'white',
            padding: '8px 16px',
            border: "none",
            backgroundColor: '#18A594',
            borderRadius: '4px',
            opacity: isSubmitting ? 0.5 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      ) : (
        <button
          onClick={handleNext}
          style={{
            padding: '8px 16px',
            color: "white",
            backgroundColor: '#18A594',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      )}
    </div>
  </div>
  );
}