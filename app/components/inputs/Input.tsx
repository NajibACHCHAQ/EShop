'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps{
    id:string;
    label:string;
    type?:string;
    disabled?:boolean;
    required:boolean;
    register: UseFormRegister<FieldValues>;
    errors:FieldErrors;
    placeholder?:string;
}

export const Input:React.FC<InputProps> = (
{   id,
    label,
    type,
    disabled,
    required,
    register,
    errors,
    placeholder}
) => {
  return (
    <div className='w-[70%] relative'>
        <input 

        autoComplete='off'
        id={id}
        disabled={disabled}
        {...register(id, {required})}
        placeholder={placeholder}
        type={type}
        className={` flex text-center peer w-full p-4 pt-6 outline text-black bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-400' : 'border-slate-300'} ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'} `}/>
        <label htmlFor={id} 
            className='absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
        >{label}</label>
    </div>
  )
}