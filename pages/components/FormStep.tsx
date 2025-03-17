import React from "react";

interface FormStepProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  disabled?: boolean;
}

const FormStep: React.FC<FormStepProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="form-step">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default FormStep;
