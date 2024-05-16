import React from 'react'
import { useForm } from "react-hook-form";

export default function
  Input( // Here are some properties you can use for your form styling, adding labels, validation, etc..
  { label, type, id, required, placeholder, inputStyle, inputValue, errorMessage, onChange }) {
  const { register, formState: { errors } } = useForm();
  return (
    <div>
      <label
        htmlFor={id}>{label}
        {label && required && <span className='star'>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
        inputValue={inputValue}
        onChange={onChange}
        {...register(id,
          {
            required: errorMessage,
          })
        }
      />
      {errors.id && <p>{alert(errorMessage)}</p>}

    </div>
  )
}
