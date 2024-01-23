'use client'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import { Container } from '@/app/components/Container'
import { FormWrap } from '@/app/components/FormWrap'
import { Heading } from '@/app/components/Heading'
import { Input } from '@/app/components/inputs/Input'
import { TextArea } from '@/app/components/inputs/TextArea'
import { register } from 'module'

import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export const AddProductForm =  () => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, setValue, watch, reset,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            description:'',
            brand:'',
            category:'',
            inStock:false,
            stockQty:0,
            images:[],
            price:''

        }
    })
    return(
        <>
            <Heading title='Ajouter un Produit' center></Heading>
            <Input
                id="name"
                label='Nom'
                disabled={isLoading}
                register={register}
                errors={errors} 
                required/>
            <Input
                id="price"
                label='Prix'
                disabled={isLoading}
                register={register}
                errors={errors} 
                type='number'
                required/>
            <Input
                id="brand"
                label='Marque'
                disabled={isLoading}
                register={register}
                errors={errors} 
                required/>
            <TextArea
                id="description"
                label='Description'
                disabled={isLoading}
                register={register}
                errors={errors} 
                required/>
            
            
        </>
    )
}
