'use client'
import { Heading } from '@/app/components/Heading';
import { Status } from '@/app/components/Status';
import { formatPrice } from '@/utils/formatPrice';
import { Order } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdAccessTimeFilled, MdDone } from 'react-icons/md';

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const router = useRouter();

  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
      <div className='mt-8'>
        <Heading title='Détails de commande' />
      </div>
      <div>Order ID. {order.id}</div>
      <div>
        Montant Total: <span className='font-bold'>{formatPrice(order.amount)}</span>
      </div>
      <div className=''>
      <div>Status paiement:</div>
      <div>
        {order.status === 'pending' ? (
          <Status
            text='pending'
            icon={MdAccessTimeFilled}
            bg='bg-slate-200'
            color='text-slate-700'
          />
        ) : order.status === 'complete' ? (
          <Status text='completed' icon={MdDone} bg='bg-slate-200' color='text-slate-700' />
        ) : (
          <></>
        )}
      </div>
      </div>
      
    </div>
  );
};
