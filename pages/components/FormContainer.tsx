import React, { useState } from "react";
import FormStep from "./FormStep";
import EmblaCarousel from "./EmblaCarousel";
import { validateField } from "../utils/debounce";
import { FormData, validateStep } from "../utils/validation";

interface FormContainerProps {
  isMobile?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({ isMobile }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(0);
  const [isFieldValid, setIsFieldValid] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({
    username: false,
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name as keyof FormData, value, setErrors, setIsFieldValid);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const currentStepData = {
        [`${Object.keys(formData)[step]}` as keyof FormData]:
          formData[`${Object.keys(formData)[step]}` as keyof FormData],
      };
      const isValid = validateStep(currentStepData);
      if (isValid) {
        const response = await fetch("/api/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: formData[`${Object.keys(formData)[step]}` as keyof FormData],
            field: `${Object.keys(formData)[step]}`,
          }),
        });

        const result = await response.json();

        if (result.success) {
          if (step < 2) {
            setStep((prevStep: number) => prevStep + 1);
          } else {
            alert("Form submitted successfully!");
            setFormData({
              username: "",
              email: "",
              password: "",
            });
            setErrors({});
            setStep(0);
            setIsFieldValid({
              username: false,
              email: false,
              password: false,
            });
          }
        } else {
          console.error(result.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isMobile) {
    return (
      <form
        className="h-full flex flex-col justify-evenly"
        onSubmit={handleSubmit}
      >
        <EmblaCarousel step={step} setStep={setStep}>
          <FormStep
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <FormStep
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={!isFieldValid.username}
          />
          <FormStep
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={!isFieldValid.email}
          />
        </EmblaCarousel>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          disabled={
            !isFieldValid[Object.keys(formData)[step] as keyof FormData]
          }
        >
          {step < 2 ? "Next" : "Submit"}
        </button>
      </form>
    );
  }

  return (
    <form
      className="flex flex-col justify-stretch items-stretch w-full gap-4"
      onSubmit={handleSubmit}
    >
      <FormStep
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <FormStep
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={!isFieldValid.username}
      />
      <FormStep
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        disabled={!isFieldValid.email}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        disabled={!isFieldValid.password}
      >
        Submit
      </button>
    </form>
  );
};

export default FormContainer;
