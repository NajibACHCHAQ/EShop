'use client'
import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { Input } from '../components/inputs/Input'
import { Button } from '../components/Button'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'



export const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
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
            <Heading title='Créé un compte'/>
            <hr className='bg-slate-300 w-full h-px'/>
            <Input 
                id='name' label='Nom' disabled={isLoading} register={register} errors={errors} required placeholder='Saississaez votre nom'
            />
            <Input 
                id='email' label='Email' disabled={isLoading} register={register} errors={errors} required 
            />
            <Input 
                id='password' label='Mot de passe' disabled={isLoading} register={register} errors={errors} required type='password'
            />
            <Button label={isLoading ? "Chargement" : "S'enregistrer"} onClick={handleSubmit(onSubmit)} custom='w-[70%]' />
            <p className='text-sm'>Déja un compte ? <Link href={'/login'} className='underline cursor-pointer'>Se connecter</Link></p>
        </>
  )
}
