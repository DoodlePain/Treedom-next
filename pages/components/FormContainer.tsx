"use client";

import React, { useEffect, useState } from "react";
import FormStep from "./FormStep";
import EmblaCarousel from "./EmblaCarousel";
import { validateField } from "../utils/debounce";
import { FormData, validateStep } from "../utils/validation";
import {
  AccordionItem,
  ControlledAccordion,
  useAccordionProvider,
} from "@szhsin/react-accordion";

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
  const [loading, setLoading] = useState(false);

  const providerValue = useAccordionProvider({
    allowMultiple: true,
    transition: true,
    transitionTimeout: 250,
  });
  const { toggle, toggleAll } = providerValue;

  useEffect(() => {
    toggle(0);
  }, [toggle]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    await validateField(
      name as keyof FormData,
      value,
      setErrors,
      setIsFieldValid
    );
    setLoading(true);
    // Aggiunto per simulare il caricamento dell'api visto che é locale
    setTimeout(() => setLoading(false), 300);
  };

  const handleNext = async (currentStep: number) => {
    setLoading(true);
    const currentStepData = {
      [`${Object.keys(formData)[currentStep]}` as keyof FormData]:
        formData[`${Object.keys(formData)[currentStep]}` as keyof FormData],
    };
    const isValid = validateStep(currentStepData);
    if (isValid) {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input:
            formData[`${Object.keys(formData)[currentStep]}` as keyof FormData],
          field: `${Object.keys(formData)[currentStep]}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toggleAll(false);
        setStep(currentStep + 1);
        toggle(currentStep + 1);
      } else {
        console.error(result.message);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
        toggleAll(false);
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
        toggle(0);
      } else {
        console.error(result.message);
      }
    }
    setLoading(false);
  };

  const mobileSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 2) {
      handleNext(step);
    } else {
      handleSubmit(e);
    }
  };

  const renderButtonContent = (text: string) => (
    <>
      {loading && <span className="spinner" />}
      {text}
    </>
  );

  if (isMobile) {
    return (
      <form
        className="h-full flex flex-col justify-evenly"
        onSubmit={mobileSubmitHandler}
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
            !isFieldValid[Object.keys(formData)[step] as keyof FormData] ||
            loading
          }
        >
          {renderButtonContent(step < 2 ? "Next" : "Submit")}
        </button>
      </form>
    );
  }

  return (
    <form
      className="flex flex-col justify-stretch items-stretch w-full gap-4"
      onSubmit={handleSubmit}
    >
      <ControlledAccordion providerValue={providerValue} defaultValue={0}>
        <AccordionItem
          header="Step 1: Username"
          itemKey={0}
          className="accordion-item"
        >
          <FormStep
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 mt-4"
            onClick={() => handleNext(0)}
            disabled={!isFieldValid.username || loading}
          >
            {renderButtonContent("Next")}
          </button>
        </AccordionItem>
        <AccordionItem
          header="Step 2: Email"
          itemKey={1}
          className="accordion-item"
        >
          <FormStep
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={!isFieldValid.username}
          />
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 mt-4"
            onClick={() => handleNext(1)}
            disabled={!isFieldValid.email || loading}
          >
            {renderButtonContent("Next")}
          </button>
        </AccordionItem>
        <AccordionItem
          header="Step 3: Password"
          itemKey={2}
          className="accordion-item"
        >
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
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 mt-4"
            disabled={!isFieldValid.password || loading}
          >
            {renderButtonContent("Submit")}
          </button>
        </AccordionItem>
      </ControlledAccordion>
    </form>
  );
};

export default FormContainer;
