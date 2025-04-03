import { InputTypes } from "@/constants/enums";
import { IFormField } from "@/types/app";
import React from "react";
import TextFields from "./TextFields";
import PasswordFields from "./PasswordFields";
import Checkbox from "./CheckBoxField";

interface Props extends IFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export default function FormFields(props: Props) {
  const { type } = props;

  const renderFields = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextFields {...props} />;
    }
    if (type === InputTypes.PASSWORD) {
      return <PasswordFields {...props} />;
    }

    if (type === InputTypes.CHECKBOX) {
      return <Checkbox {...props} />;
    }
    return <TextFields {...props} />;
  };

  return <>{renderFields()}</>;
}
