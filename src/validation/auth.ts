import * as z from "zod";
import { Translation } from "@/types/Translation";

export const LoginSchema = (translation: Translation) => {
  return z.object({
    email: z.string().trim().email({
      message: translation.validation.validEmail,
    }),
    password: z
      .string()
      .min(6, {
        message: translation.validation.passwordMinLength,
      })
      .max(40, {
        message: translation.validation.passwordMaxLength,
      }),
  });
};

export const registerSchema = (translate: Translation) => {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(1, { message: translate?.validation?.nameRequired }),
      email: z
        .string()
        .trim()
        .email({ message: translate.validation.validEmail }),
      password: z
        .string()
        .trim()
        .min(6, { message: translate.validation.passwordMinLength })
        .max(40, { message: translate.validation.passwordMaxLength }),
      confirmPassword: z.string(),
    })
    .refine((value) => value?.password === value?.confirmPassword, {
      message: translate.validation.passwordMismatch,
      path: ["confirmPassword"],
    });
};

export type ValidationError =
  | {
      [key: string]: string[];
    }
  | undefined;
