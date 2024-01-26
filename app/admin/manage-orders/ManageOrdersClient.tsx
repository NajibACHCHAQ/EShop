'use client'

import { Order, Product, User } from '@prisma/client'
import React, { useCallback } from 'react'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice'
import { Heading } from '@/app/components/Heading'
import { Status } from '@/app/components/Status'
import { MdAccessTimeFilled, MdCached, MdClose, MdDelete, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md'
import { ActionBtn } from '@/app/components/ActionBtn'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import firebaseApp from '@/libs/firebase'
import moment from 'moment'

interface ManageOrdersClientProps{
    orders:ExtendedOrders[]
}
type ExtendedOrders = Order & {
    user:User
}

export const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {
    // Assurez-vous que vous utilisez la bonne méthode et la bonne condition

    console.log('Données récupérées depuis la base de données :',orders);
    const router = useRouter()
    const storage = getStorage(firebaseApp)

    const handleDeliver = ()=>{}
    const handleDispatch = ()=>{}


    let rows:any =[]
    if(orders){
        rows = orders.map((order)=>{
            return{
                id:order.id,
                customer:order.user.name,
                amount:formatPrice(order.amount / 100),
                paymentStatus:order.status,
                date:moment(order.createDate).fromNow(),
                deliverStatus:order.deliveryStatus,
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
            <Status text='pending' icon={MdAccessTimeFilled} bg="bg-slate-200" color='text-slate-700'/>
            ) : params.row.paymentStatus === 'complete' ? (
            <Status text='completed' icon={MdDone} bg='bg-purple-200' color='text-purple-700'/>
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
                <ActionBtn icon={MdDeliveryDining} onClick={()=>{handleDispatch()}} />
                <ActionBtn icon={MdDone} onClick={()=>{handleDeliver()}} />
                <ActionBtn icon={MdRemoveRedEye} onClick={()=>{
                    router.push(`order/${params.row.id}`)
                }} />
                
                </div>
                
                )
        }}
    ]

    const handleToggleStock = useCallback((id:string,inStock:boolean)=>{
        axios.put('/api/product',{
            id,
            inStock: !inStock
        }).then((res)=>{
            toast.success('Status du produit changé')
            router.refresh();
        }).catch((err)=>{
            toast.error('Oops! Somethings went wrong')
            console.log(err)
        })
    },[])
    const handleDelete = useCallback(async(id:string,images:any)=>{
        toast('Suppression du produit...')
        const handleImageDelete = async ()=>{
            try{
                for(const item of images){
                    if(item.image){
                       const imageRef = ref(storage, item.image)
                       await deleteObject(imageRef)
                       console.log('image supprimmée',item.image)
                    }
                }
            }catch(error){
                return console.log("Erreur lors de la suppression de l'image",error)
            }
        }

        await handleImageDelete()

        axios.delete(`/api/product/${id}`).then(
            (res)=>{
                toast.success('produit supprimé')
                router.refresh()
            }
        ).catch((err)=>{
            toast.error('Erreur lors de la suppression du produit')
            console.log(err)
        })
        
    },[])

  return (
    <div className='max-w-[1450px] m-auto text-xl'>
        <div className='mb-4 mt-8'>
            <Heading title='Manage Products' center/>
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
