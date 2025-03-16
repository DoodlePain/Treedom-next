import React from "react";
import FormField from "./FormField";

interface FormStepProps {
  step: number;
  formData: Record<string, string>;
  errors: Record<string, string | undefined>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormStep: React.FC<FormStepProps> = ({ step, formData, errors, handleChange, handleSubmit }) => {
  const fields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label={fields[step].label}
        name={fields[step].name}
        type={fields[step].type}
        value={formData[fields[step].name]}
        onChange={handleChange}
        error={errors[fields[step].name]}
      />
      <button type="submit">{step < fields.length - 1 ? "Next" : "Submit"}</button>
    </form>
  );
};

export default FormStep;
