'use client'
import React from 'react'

import { Heading } from "@/app/components/Heading"
import { SafeUser } from "@/types"
import { Button } from '@/app/components/Button'
import { Rating } from "@mui/material"
import { Order, Product, Review } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form"
import { Input } from '@/app/components/inputs/Input'

interface AddRatingProps{
    product:Product & {
        reviews: Review[]
    }
    user:(SafeUser & {
        orders:Order[]
    }) | null
}




const AddRating:React.FC<AddRatingProps> = ({product, user}) => {

    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const {register, handleSubmit, setValue, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            comment:'',
            rating:0
        }
    })

    const setCustomValue = (id:string, value:any) =>{
        setValue(id,value,{
            shouldTouch:true,
            shouldDirty:true,
            shouldValidate:true
        })
    }

    const onsubmit:SubmitHandler<FieldValues> = async(data)=>{
        console.log(data)
    }

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
        <Heading title='Rate this product'/>
        <Rating onChange={(event,newValue)=>{
            setCustomValue('rating',newValue)
        }}/>
        <Input id={'comment'} label={'Comment'} required register={register} errors={errors}/>
        <Button label={isLoading ? "Loading" : "Rate Product"} onClick={handleSubmit(onsubmit)}/>
        
    </div>
  )
}

export default AddRating;
