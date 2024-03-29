'use client'
import { Heading } from '@/app/components/Heading';
import { Status } from '@/app/components/Status';
import { formatPrice } from '@/utils/formatPrice'
import { Order } from '@prisma/client';
import moment from 'moment';
import React from 'react';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md'
import OrderItem from './OrderItem';

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {

  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
      <div className='mt-8'>
        <Heading title='Détails de commande' />
      </div>
      <div>Order ID. {order.id}</div>
      <div>
        Montant Total: <span className='font-bold'>{formatPrice(order.amount /100)}</span>
      </div>
      <div className='flex gap-2 items-center'>
      <div>Status paiement:</div>
      <div>
        {order.status === 'pending' ? (
          <Status
            text='En attente'
            icon={MdAccessTimeFilled}
            bg='bg-slate-200'
            color='text-slate-700'
          />
            ) : order.status === 'complete' ? (
            <Status 
            text='Validé' 
            icon={MdDone} 
            bg='bg-green-200' 
            color='text-green-700' />
            ) : (
          <></>
        )}
      </div>
      </div>
      <div className='flex gap-2 items-center'>
      <div>Status livraison:</div>
      <div>{
      order.deliveryStatus === 'pending' ? (
            <Status
                text='En attente'
                icon={MdAccessTimeFilled}
                bg='bg-slate-200'
                color='text-slate-700'
            />
        ) : order.deliveryStatus === 'dispatched' ? (
            <Status 
                text='En cours' 
                icon={MdDeliveryDining} 
                bg='bg-purple-200' 
                color='text-purple-700' />
        ) : order.deliveryStatus === 'delivered' ? (
            <Status 
                text='Livré' 
                icon={MdDone} 
                bg='bg-green-200' 
                color='text-green-700' />
        ) : (
          <></>
        )}
      </div>
      </div>
      <div className='flex gap-2 items-center'>
      <div>
    {order.address ? (
    
    <div className='ml-8 flex flex-col p-2 border-[1.5px] border-gray-600 rounded-[10px]'>
    <div className=' border-b-gray-400'>{order.address.line1}</div>
    <div className='border-gray-400'>{order.address.city}</div> 
    <div className='border-gray-400'>{order.address.state}</div> 
    <div className='border-gray-400'>{order.address.postal_code}</div>
    <div className='border-gray-400'>{order.address.country}</div>
    </div>
   
  ) : (
    "Aucune adresse de livraison disponible"
  )}
</div>
    </div>
      <div>Date: {moment(order.createDate).fromNow()}</div>
      <div>
        <h2 className='font-semibold mt-4 mb-2'>Produits commandé</h2>
        <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center'>
            <div className='col-span-2 justify-self-start'>PRODUIT</div>
            <div className=' justify-self-center'>PRIX</div>
            <div className=' justify-self-center'>QTY</div>
            <div className=' justify-self-end'>TOTAL</div>
        </div>
        {order.products && order.products.map(item =>{
            return <OrderItem key={item.id} item={item}>
            </OrderItem>
        })}
      </div>
    </div>
  );
};
