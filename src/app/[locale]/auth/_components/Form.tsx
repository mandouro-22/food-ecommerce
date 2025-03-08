import { Pages } from "@/constants/enums";
import { useFormFields } from "@/hooks/useFormFields";

export function Form() {
  const { getFormFields } = useFormFields({ slug: Pages.LOGIN, translate: {} });
  console.log(getFormFields());
  return <div>Form</div>;
}
