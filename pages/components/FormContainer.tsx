import React, { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import debounce from "lodash.debounce";
import useEmblaCarousel from "embla-carousel-react";
import FormField from "./FormField";
import { DotButton, useDotButton } from "./DotButtons";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: "keepSnaps",
    direction: "ltr",
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(step);
    }
  }, [step, emblaApi]);

  const validateField = useCallback(
    debounce(async (name: keyof FormData, value: string) => {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: value, field: name }),
      });

      const result = await response.json();

      if (!result.success) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: result.message,
        }));
        setIsFieldValid((prevValid) => ({
          ...prevValid,
          [name]: false,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
        setIsFieldValid((prevValid) => ({
          ...prevValid,
          [name]: true,
        }));
      }
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const validateStep = (data: Partial<FormData>) => {
    const result = schema.partial().safeParse(data);
    if (!result.success) {
      const newErrors: Partial<FormData> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          newErrors[error.path[0] as keyof FormData] = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentStepData = {
      [`${Object.keys(formData)[step]}` as keyof FormData]:
        formData[`${Object.keys(formData)[step]}` as keyof FormData],
    };
    if (validateStep(currentStepData)) {
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
        setStep((prevStep: number) => prevStep + 1);
        if (emblaApi) {
          emblaApi.scrollTo(step + 1);
        }
      } else {
        console.error(result.message);
      }
    }
  };

  const onDotClickHandler = (index: number) => {
    onDotButtonClick(index);
    setStep(index);
  };

  if (isMobile) {
    return (
      <form
        className="h-full flex flex-col justify-evenly"
        onSubmit={handleSubmit}
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex flex-row gap-4">
            <div className="embla__slide min-w-0 flex-[0_0_100%]">
              <FormField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />
            </div>
            <div className="embla__slide min-w-0 flex-[0_0_100%]">
              <FormField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={!isFieldValid.username}
              />
            </div>
            <div className="embla__slide min-w-0 flex-[0_0_100%]">
              <FormField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={!isFieldValid.email}
              />
            </div>
          </div>
        </div>
        <div className="embla__controls">
          <div className="embla__dots flex flex-row gap-2 items-center justify-center my-4">
            {scrollSnaps.map((_: number, index: number) => (
              <DotButton
                key={index}
                onClick={() => onDotClickHandler(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>

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
      <FormField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <FormField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={!isFieldValid.username}
      />
      <FormField
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
