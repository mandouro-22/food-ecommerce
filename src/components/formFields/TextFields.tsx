import { IFormField } from "@/types/app";
import { Input } from "../ui/input";

interface Props extends IFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export default function TextFields({
  label,
  name,
  type,
  autoFocus,
  defaultValue,
  disabled,
  error,
  placeholder,
  readOnly,
}: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="capitalize mb-2 text-black">
        {label}
      </label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={defaultValue}
        disabled={disabled}
        autoFocus={autoFocus}
      />

      {error && error[name] && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error[name] ? "text-destructive" : ""
          }`}>
          {error[name]}
        </p>
      )}
    </div>
  );
}
