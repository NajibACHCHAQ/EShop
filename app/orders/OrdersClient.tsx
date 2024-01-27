'use client'

import { Order, User } from '@prisma/client'
import React, { useCallback } from 'react'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice'
import { Heading } from '@/app/components/Heading'
import { Status } from '@/app/components/Status'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md'
import { ActionBtn } from '@/app/components/ActionBtn'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getStorage } from 'firebase/storage'
import firebaseApp from '@/libs/firebase'
import moment from 'moment'

interface OrdersClientProps{
    orders:ExtendedOrders[]
}
type ExtendedOrders = Order & {
    user:User
}

export const OrdersClient:React.FC<OrdersClientProps> = ({orders}) => {
    // Assurez-vous que vous utilisez la bonne méthode et la bonne condition

    console.log('Données récupérées depuis la base de données :',orders);
    const router = useRouter()
    const storage = getStorage(firebaseApp)



    let rows:any =[]
    if(orders){
        rows = orders.map((order)=>{
            return{
                id:order.id,
                customer:order.user.name,
                amount:formatPrice(order.amount / 100),
                paymentStatus:order.status,
                date:moment(order.createDate).fromNow(),
                deliveryStatus:order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        {field:"id",headerName:'ID', width:220},
        {field: 'custumer',headerName:'Client', width:130},
        {field: 'amount',headerName:'Total(EUR)', width:130,renderCell:(params)=>{
            return(<div className='font-bold text-slate-800'>{params.row.amount}</div>)
        }},
        {field: 'paymentStatus',headerName:'Status Paiement', width:130,renderCell:(params)=>{
            return(<div >{params.row.paymentStatus === 'pending' ? (
            <Status text='en attente' icon={MdAccessTimeFilled} bg="bg-slate-200" color='text-slate-700'/>
            ) : params.row.paymentStatus === 'complete' ? (
            <Status text='validé' icon={MdDone} bg='bg-green-200' color='text-green-700'/>
            ) : (
            <></>
            )  }
            </div>)
        }},
        {field: 'deliveryStatus',headerName:'Status Livraison', width:130,renderCell:(params)=>{
            return(<div >{params.row.deliveryStatus === 'pending' ? (
            <Status text='pending' icon={MdAccessTimeFilled} bg="bg-slate-200" color='text-slate-700'/>
            ) : params.row.deliveryStatus === 'dispatched' ? (
            <Status text='dispatched' icon={MdDeliveryDining} bg='bg-purple-200' color='text-purple-700'/>
            ) : params.row.deliveryStatus === 'delivered' ? (
            <Status text='delivered' icon={MdDone} bg='bg-green-200' color='text-green-700'/>
            ): <></> }
            </div>)
        }},
        {
            field: 'date',
            headerName:'Date',
            width:130
        },
        
        {field: 'action',headerName:'Actions', width:200,renderCell:(params)=>{
            return(<div className='flex justify-between gap-4 w-full' >
                <ActionBtn icon={MdDeliveryDining} onClick={()=>{handleDispatch(params.row.id)}} />
                <ActionBtn icon={MdDone} onClick={()=>{handleDeliver(params.row.id)}} />
                <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
                    router.push(`/order/${params.row.id}`);
                }} />
                
                </div>
                
                )
        }}
    ]

    const handleDispatch = useCallback((id:string)=>{
        axios.put('/api/order',{
            id,
            deliveryStatus: 'dispatched'
        }).then((res)=>{
            toast.success('Commande envoyé')
            router.refresh();
        }).catch((err)=>{
            toast.error('Oops! Somethings went wrong')
            console.log(err)
        })
    },[])

    const handleDeliver = useCallback((id:string)=>{
        axios.put('/api/order',{
            id,
            deliveryStatus: 'delivered'
        }).then((res)=>{
            toast.success('Commande livrée')
            router.refresh();
        }).catch((err)=>{
            toast.error('Oops! Somethings went wrong')
            console.log(err)
        })
    },[])
    

  return (
    <div className='max-w-[1450px] m-auto text-xl'>
        <div className='mb-4 mt-8'>
            <Heading title='Gestion des commandes' center/>
        </div>
        <div style={{height:600, width:'100%'}}>
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
            disableRowSelectionOnClick
            />
        </div>
    </div>
  )
}
