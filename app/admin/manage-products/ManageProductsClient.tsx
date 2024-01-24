'use client'

import { Product } from '@prisma/client'
import React from 'react'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice'
import { dividerClasses } from '@mui/material'

interface ManageProductsClientProps{
    products:Product[]
}

export const ManageProductsClient:React.FC<ManageProductsClientProps> = ({products}) => {
    console.log('Données récupérées depuis la base de données :', products);

    let rows:any =[]
    if(products){
        rows = products.map((product)=>{
            return{
                id:product.id,
                name:product.name,
                price:formatPrice(product.price),
                category:product.category,
                brand:product.brand,
                inStock:product.inStock,
                images:product.images
            }
        })
    }

    const columns: GridColDef[] = [
        {field:"id",headerName:'ID', width:220},
        {field: 'name',headerName:'Name', width:220},
        {field: 'price',headerName:'Price(EUR)', width:100,renderCell:(params)=>{
            return(<div className='font-bold text-slate-800'>{params.row.price}</div>)
        }},
        {field: 'category',headerName:'Category', width:100},
        {field: 'brand',headerName:'Brand', width:100},
        {field: 'inStock',headerName:'InStock', width:120,renderCell:(params)=>{
            return(<div >{params.row.inStock === true ? 'En stock' : 'Rupture de stock' }</div>)
        }},
        {field: 'images',headerName:'Images', width:200,renderCell:(params)=>{
            return(<div>Action</div>)
        }}
    ]

  return (
    <div>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            />
    </div>
  )
}
