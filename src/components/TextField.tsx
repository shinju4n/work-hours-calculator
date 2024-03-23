import React from "react";
import FlexBox from "./FlexBox";
import Input from "./ui/input";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextField: React.FC<FieldProps> = ({ label, ...props }) => {
  return (
    <FlexBox direction="column" alignItems="flex-start" gap={0.5}>
      <label>{label}</label>
      <Input {...props} />
    </FlexBox>
  );
};

export default TextField;
