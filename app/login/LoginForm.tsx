'use client'
import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { Button } from '../components/Button'
import { Input } from '../components/inputs/Input'
import { AiOutlineGoogle } from 'react-icons/ai'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        console.log(data)
    }
  return (
    <>
    <Heading title='Se connecter'/>
    <Button custom='w-[70%]' outline label="Se connecter avec Google" icon={AiOutlineGoogle} onClick={()=>{}}/>
    <hr className='bg-slate-300 w-full h-px'/>
    <Input 
        id='email' label='Email' disabled={isLoading} register={register} errors={errors} required 
    />
    <Input 
        id='password' label='Mot de passe' disabled={isLoading} register={register} errors={errors} required type='password'
    />
    <Button label={isLoading ? "Chargement" : "Se connecter"} onClick={handleSubmit(onSubmit)} custom='w-[70%]' />
    <p className='text-sm'>Pas de compte ? <Link href={'/register'} className='underline cursor-pointer'>Créé un compte</Link></p>
</>
  )
}
