'use client'
import React, { useEffect, useState } from 'react'
import { Heading } from '../components/Heading'
import { Input } from '../components/inputs/Input'
import { Button } from '../components/Button'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/types'

interface RegisterFormProps {
    currentUser: SafeUser | null
}


export const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })

    const router =useRouter()

    useEffect(()=>{
        if(currentUser){
            router.push('/cart')
            router.refresh()
        }
    },[])

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        console.log(data)

        axios.post('/api/register', data).then(()=> {
            alert('compte crée avec succès')
            signIn('credentials',{
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback)=>{
                if(callback?.ok){
                    router.push('/cart')
                    router.refresh()
                    alert('Logged In')
                }
                if(callback?.error){
                    alert('Erreur')
                }
            })
        }).catch(()=> alert('Something wrong')).finally(()=>{
            setIsLoading(false)
        }
            
        )
    }
    if(currentUser){
        return <p className='text-center'>Connection reussi !  Redirection en cours ...</p>
    }
    return (
        <>
            <Heading title='Créé un compte'/>
            <Button custom='w-[69%]' outline label="S'enregistrer avec Google" icon={AiOutlineGoogle} onClick={()=>{}}/>
            <hr className='bg-slate-300 w-full h-px'/>
            <Input 
                id='name' label='Nom' disabled={isLoading} register={register} errors={errors} required placeholder=''
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
