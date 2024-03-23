export const onlyNumbers = (inputValue: string) => {
  const numericValue: string = inputValue.replace(/\D/g, "");
  return numericValue;
};
