import React, { FC, useState, useCallback } from "react";

export const FormField: FC<{
  label: string;
  value: string;
  onChange?: (newValue: string) => void;
  disabled?: boolean;
}> = ({ label, value: passedValue, onChange: passedOnChange, disabled }) => {
  const [value, setValue] = useState(passedValue);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value);
      passedOnChange?.(e.target.value);
    },
    [passedOnChange],
  );
  return (
    <div className="flex p-1 items-center">
      <div className="pr-4 w-32 text-right">{label}</div>
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border p-1 pl-4 w-64 rounded-lg disabled:bg-gray-200"
      />
    </div>
  );
};
