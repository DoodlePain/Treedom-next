import { z } from "zod";

export const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type FormData = z.infer<typeof schema>;

export const validateStep = (data: Partial<FormData>) => {
  const result = schema.partial().safeParse(data);
  if (!result.success) {
    const newErrors: Partial<FormData> = {};
    result.error.errors.forEach((error) => {
      if (error.path[0]) {
        newErrors[error.path[0] as keyof FormData] = error.message;
      }
    });
    throw new Error("Invalid data");
  }
  return true;
};

export default validateStep;
