"use server";

import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { LoginSchema, registerSchema } from "@/validation/auth";
import bcrypt from "bcrypt";

export const Login = async (
  credential: Record<"email" | "password", string> | undefined,
  locale: Locale
) => {
  const translation = await getDictionary(locale);
  const result = LoginSchema(translation).safeParse(credential);

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result?.data?.email,
      },
    });

    if (!user) {
      return {
        message: translation?.messages?.userNotFound,
        status: 401,
      };
    }

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(
      result?.data?.password,
      hashedPassword
    );

    if (!isValidPassword) {
      return {
        message: translation?.messages?.incorrectPassword,
        status: 401,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;

    return {
      userData,
      status: 200,
      message: translation?.messages?.loginSuccessful,
    };
  } catch (error) {
    console.error(" error in login server ❌   " + error);
    return {
      error: translation?.messages?.unexpectedError,
      status: 500,
    };
  }
};

export const signup = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const result = registerSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        status: 409,
        message: translations.messages.userAlreadyExists,
        formData,
      };
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      message: translations.messages.accountCreated,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
