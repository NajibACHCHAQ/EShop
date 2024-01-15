'use client'
import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { Input } from '../components/inputs/Input'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'


export const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })
  return (
    <>
    <Heading title='Sign Up'/>
    <hr className='bg-slate-300 w-full h-px'/>
    <Input 
    id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
    </>
  )
}
