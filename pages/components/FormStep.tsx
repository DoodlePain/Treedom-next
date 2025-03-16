import React from "react";
import FormField from "./FormField";

interface FormStepProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const FormStep: React.FC<FormStepProps> = ({ label, name, type = "text", value, onChange, error, disabled }) => (
  <div className="embla__slide min-w-0 flex-[0_0_100%]">
    <FormField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      disabled={disabled}
    />
  </div>
);

export default FormStep;
