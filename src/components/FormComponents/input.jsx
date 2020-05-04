import React from "react";

const Input = (props) => {
  const {
    className,
    id,
    label,
    type,
    placeholder,
    onChange,
    value,
    validationError,
  } = props;
  return (
    <div className={className || "form-group"}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control text-capitalize"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {validationError && (
        <div className="alert alert-danger">{validationError}</div>
      )}
    </div>
  );
};

export default Input;
