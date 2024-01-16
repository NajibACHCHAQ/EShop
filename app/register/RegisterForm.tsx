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
            <Heading title='Créé un compte'/>
            <hr className='bg-slate-300 w-full h-px'/>
            <Input 
                id='name' label='Nom' disabled={isLoading} register={register} errors={errors} required placeholder='Saississaez votre nom'
            />
            <Input 
                id='email' label='Email' disabled={isLoading} register={register} errors={errors} required 
            />
            <Input 
                id='password' label='Mot de passe' disabled={isLoading} register={register} errors={errors} required 
            />
        </>
  )
}
