'use client'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import { Button } from '@/app/components/Button'
import { Container } from '@/app/components/Container'
import { FormWrap } from '@/app/components/FormWrap'
import { Heading } from '@/app/components/Heading'
import { CategoryInput } from '@/app/components/inputs/CategoryInput'
import { CustomCheckbox } from '@/app/components/inputs/CustomCheckbox'
import { Input } from '@/app/components/inputs/Input'
import { SelectColor } from '@/app/components/inputs/SelectColor'
import { TextArea } from '@/app/components/inputs/TextArea'
import { categories } from '@/utils/Categories'
import { colors } from '@/utils/Colors'
import { register } from 'module'

import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export type ImageType ={
    color:string;
    colorCode:string;
    image: File | null
}
export type UploadedImageType ={
    color:string;
    colorCode:string;
    image: string;
}

export const AddProductForm =  () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)


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
    useEffect(()=>{
        setCustomValue('images', images)
    },[images])

    useEffect(()=>{
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false)
        }
    },[isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        console.log('Product Data',data )
    }

    const category = watch("category")
    const setCustomValue = (id:string, value:any) =>{
        setValue(id, value,{
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch:true
        })
    }

    const addImageToState = useCallback((value:ImageType)=>{
        setImages((prev)=>{
            if(!prev){
                return [value]
            }
            return [...prev, value]
        })
    },[])
    const removeImageFromState = useCallback((value:ImageType)=>{
        setImages((prev)=>{
            if(prev){
                const filteredImages = prev.filter((item) => item.color !== value.color)
                return filteredImages;
            }


            return prev
        })
    },[])

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
             label='En stock'           
             register={register} 
             />
             <div className='w-full font-medium'>
                <div className='mb-2 font-semibold'>Choisir une catégorie</div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3 max-[50vh] overflow-y-auto'>
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
             <div className='w-full flex flex-col flex-wrap gap-4'>
                <div>
                    <div className='font-bold'>
                        Selectionnez couleurs et images
                    </div>
                    <div className='text-sm'>
                        Vous devez selectionnez une image pour chaque couleur de produit
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    {colors.map((item,index)=>{
                        return <SelectColor key={index} item={item} 
                                            addImageToState={addImageToState} 
                                            removeImageFromState={removeImageFromState}
                                            isProductCreated={isProductCreated}
                                />
                    })}
                </div>
             </div>
            
            <Button label={isLoading ? 'Chargement...': 'Valider'} onClick={handleSubmit(onSubmit)}/>
        </>
    )
}
