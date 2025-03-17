import debounce from "lodash.debounce";
import { FormData } from "./validation";

export const validateField = debounce(
  async (
    name: keyof FormData,
    value: string,
    setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>,
    setIsFieldValid: React.Dispatch<
      React.SetStateAction<Partial<Record<keyof FormData, boolean>>>
    >
  ) => {
    const response = await fetch("/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: value, field: name }),
    });

    const result = await response.json();

    if (!result.success) {
      setErrors((prevErrors: Partial<FormData>) => ({
        ...prevErrors,
        [name]: result.message,
      }));
      setIsFieldValid((prevValid) => ({
        ...prevValid,
        [name]: false,
      }));
    } else {
      setErrors((prevErrors: Partial<FormData>) => ({
        ...prevErrors,
        [name]: undefined,
      }));
      setIsFieldValid((prevValid) => ({
        ...prevValid,
        [name]: true,
      }));
    }
  },
  300
);

export default validateField;
