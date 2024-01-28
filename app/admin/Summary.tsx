'use client'
import { Order, Product, User } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { Heading } from '../components/Heading';
import { formatPrice } from '@/utils/formatPrice';
import { FormatNumber } from '@/utils/FormatNumber';

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
}

export const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    TotalSale: {
      label: 'Total des Ventes',
      digit: 0,
    },
    TotalProducts: {
      label: 'Total Produits',
      digit: 0,
    },
    TotalOrders: {
      label: 'Total Commandes',
      digit: 0,
    },
    PaidOrders: {
      label: 'Commandes Validé',
      digit: 0,
    },
    UnpaidOrders: {
      label: 'Commande en cours',
      digit: 0,
    },
    TotalUsers: {
      label: 'Total Utilisateurs',
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === 'complete') {
          return acc + item.amount;
        } else return acc;
      }, 0);
      const paidOrders = orders.filter((order) => order.status === 'complete');
      const unpaidOrders = orders.filter((order) => order.status === 'pending');

      tempData.TotalSale.digit = totalSale;
      tempData.TotalOrders.digit = orders.length;
      tempData.PaidOrders.digit = paidOrders.length;
      tempData.UnpaidOrders.digit = unpaidOrders.length;
      tempData.TotalProducts.digit = products.length;
      tempData.TotalUsers.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className='max-w-[1150px] m-auto'>
      <div className='mb-4 mt-8'>
        <Heading title='Statistiques' center />
      </div>
      <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
        {summaryKeys &&
          summaryKeys.map((key) => (
            <div key={key} className='rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition'>
              <div className='text-xl md:text-4xl font-bold'>
                {summaryData[key].label === 'Total des Ventes' ? (
                  <>{formatPrice(summaryData[key].digit)}</>
                ) : (
                  <>{FormatNumber(summaryData[key].digit)}</>
                )}
              </div>
              <div>{summaryData[key].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
