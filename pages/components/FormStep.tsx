import React from "react";
import FormField from "./FormField";

interface FormStepProps {
  step: number;
  formData: Record<string, string>;
  errors: Record<string, string | undefined>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const fields = [
  { label: "Username", name: "username", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

const FormStep: React.FC<FormStepProps> = ({
  step,
  formData,
  errors,
  handleChange,
  handleSubmit,
}) => {
  const field = fields[step];

  return field?.label ? (
    <form onSubmit={handleSubmit}>
      <FormField
        label={field.label}
        name={field.name}
        type={field.type}
        value={formData[field.name]}
        onChange={handleChange}
        error={errors[field.name]}
      />
      <button type="submit">
        {step < fields.length - 1 ? "Next" : "Submit"}
      </button>
    </form>
  ) : (
    <></>
  );
};

export default FormStep;
