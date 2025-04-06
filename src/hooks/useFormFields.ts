import { Pages, Routes } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { Translation } from "@/types/Translation";

interface Props extends IFormFieldsVariables {
  translate: Translation;
}

export function useFormFields({ slug, translate }: Props) {
  const loginFields = (): IFormField[] => [
    {
      label: translate.auth.login.email.label,
      name: "email",
      type: "email",
      placeholder: translate.auth.login.email.placeholder,
      autoFocus: true,
    },
    {
      label: translate.auth.login.password.label,
      name: "password",
      type: "password",
      placeholder: translate.auth.login.password.placeholder,
    },
  ];

  const registerFields = (): IFormField[] => [
    {
      label: translate?.auth?.register?.name?.label,
      name: "name",
      placeholder: translate?.auth?.register?.name?.placeholder,
      type: "text",
      autoFocus: true,
    },
    {
      label: translate?.auth?.register?.email?.label,
      name: "email",
      placeholder: translate?.auth?.register?.email?.placeholder,
      type: "email",
    },
    {
      label: translate?.auth?.register?.password?.label,
      name: "password",
      placeholder: translate?.auth?.register?.password?.placeholder,
      type: "password",
    },
    {
      label: translate?.auth?.register?.confirmPassword?.label,
      name: "confirmPassword",
      placeholder: translate?.auth?.register?.confirmPassword?.placeholder,
      type: "password",
    },
  ];

  const profileFields = (): IFormField[] => [
    {
      label: translate.profile.form.name.label,
      name: "name",
      type: "text",
      placeholder: translate.profile.form.name.placeholder,
      autoFocus: true,
    },
    {
      label: translate.profile.form.email.label,
      name: "email",
      type: "email",
      placeholder: translate.profile.form.email.placeholder,
    },
    {
      label: translate.profile.form.phone.label,
      name: "phone",
      type: "text",
      placeholder: translate.profile.form.phone.placeholder,
    },
    {
      label: translate.profile.form.address.label,
      name: "streetAddress",
      type: "text",
      placeholder: translate.profile.form.address.placeholder,
    },
    {
      label: translate.profile.form.postalCode.label,
      name: "postalCode",
      type: "text",
      placeholder: translate.profile.form.postalCode.placeholder,
    },
    {
      label: translate.profile.form.city.label,
      name: "city",
      type: "text",
      placeholder: translate.profile.form.city.placeholder,
    },
    {
      label: translate.profile.form.country.label,
      name: "country",
      type: "text",
      placeholder: translate.profile.form.country.placeholder,
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN: {
        return loginFields();
      }
      case Pages.Register: {
        return registerFields();
      }
      case Routes.PROFILE: {
        return profileFields();
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
