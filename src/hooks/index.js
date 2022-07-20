import { useState } from "react";

const useField = (type, id, placeholder) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { id, type, value, onChange, placeholder };
};

export default useField;
