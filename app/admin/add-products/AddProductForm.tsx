'use client'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import { Container } from '@/app/components/Container'
import { FormWrap } from '@/app/components/FormWrap'
import { Heading } from '@/app/components/Heading'
import { CategoryInput } from '@/app/components/inputs/CategoryInput'
import { CustomCheckbox } from '@/app/components/inputs/CustomCheckbox'
import { Input } from '@/app/components/inputs/Input'
import { TextArea } from '@/app/components/inputs/TextArea'
import { categories } from '@/utils/Categories'
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
    const category = watch("category")
    const setCustomValue = (id:string, value:any) =>{
        setValue(id, value,{
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true
        })
    }
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

            <CustomCheckbox
             id="inStock"
             label='Description'           
             register={register} 
             />
             <div className='w-full font-medium'>
                <div className='mb-2 font-semibold'>Choisir une catégorie</div>
                <div className='grid grid-cols-2 md:grid-cols-3 max-[50vh] overflow-y-auto'>
                    {categories.map((item)=>{
                       if(item.label === 'All') {
                        return null;
                       }

                       return <div key={item.label} className='col-span'>
                            <CategoryInput onClick={(category)=> setCustomValue('category',category)}
                            selected={category === item.label}
                            label={item.label}
                            icon = {item.icon}/>
                       </div>
                    })}
                </div>
             </div>
            
            
        </>
    )
}
