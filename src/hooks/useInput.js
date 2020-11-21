import { useState } from "react";

export const useInput = (initalValue = "") => {
  const [value, setValue] = useState(initalValue);
  const handleChanges = (e) => {
    setValue(e.target.value);
  };
  return [value, setValue, handleChanges];
};
