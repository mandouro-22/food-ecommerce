import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";

interface Props extends IFormFieldsVariables {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translate: any;
}

export function useFormFields({ slug, translate }: Props) {
  const loginFields = (): IFormField[] => [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      autoFocus: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN: {
        return loginFields();
      }

      default: {
        return [];
      }
    }
  };

  return {
    getFormFields,
  };
}
