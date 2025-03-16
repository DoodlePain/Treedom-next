import React from "react";
import ErrorMessage from "./ErrorMessage";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  disabled,
}) => (
  <div className="flex flex-col md:w-full">
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="form-input"
      disabled={disabled}
      id={name}
      autoComplete="off"
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

export default FormField;
