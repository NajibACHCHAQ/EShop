'use client'
import { Order, Product, User } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { Heading } from '../components/Heading';
import { formatPrice } from '@/utils/formatPrice';
import { FormatNumber } from '@/utils/FormatNumber';

// Définition des propriétés attendues par le composant Summary
interface SummaryProps {
  orders: Order[]; // Liste des commandes
  products: Product[]; // Liste des produits
  users: User[]; // Liste des utilisateurs
}

// Définition du type de données pour le résumé
type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
}

// Composant de résumé
export const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  // État local pour stocker les données du résumé
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

  // Effet qui se déclenche lorsque les données des commandes, produits ou utilisateurs changent
  useEffect(() => {
    // Mise à jour des données du résumé
    setSummaryData((prev) => {
      let tempData = { ...prev };

      // Calcul du total des ventes
      const totalSale = orders.reduce((acc, item) => {
        if (item.status === 'complete') {
          return acc + item.amount;
        } else return acc;
      }, 0);

      // Filtrage des commandes payées et non payées
      const paidOrders = orders.filter((order) => order.status === 'complete');
      const unpaidOrders = orders.filter((order) => order.status === 'pending');

      // Mise à jour des données du résumé
      tempData.TotalSale.digit = totalSale;
      tempData.TotalOrders.digit = orders.length;
      tempData.PaidOrders.digit = paidOrders.length;
      tempData.UnpaidOrders.digit = unpaidOrders.length;
      tempData.TotalProducts.digit = products.length;
      tempData.TotalUsers.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]); // Déclenchement de l'effet lorsque les données des commandes, produits ou utilisateurs changent

  // Récupération des clés du résumé
  const summaryKeys = Object.keys(summaryData);

  return (
    <div className='max-w-[1150px] m-auto'>
      {/* En-tête du résumé */}
      <div className='mb-4 mt-8'>
        <Heading title='Statistiques' center />
      </div>
      {/* Contenu du résumé affichant les différentes statistiques */}
      <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
        {summaryKeys && // Vérification si les clés du résumé existent
          summaryKeys.map((key) => ( // Parcours des clés du résumé
            <div key={key} className='rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition'>
              {/* Affichage de la valeur du résumé */}
              <div className='text-xl md:text-4xl font-bold'>
                {/* Vérification de la clé pour formater correctement la valeur */}
                {summaryData[key].label === 'Total des Ventes' ? (
                  <>{formatPrice(summaryData[key].digit)}</> // Formatage du total des ventes
                ) : (
                  <>{FormatNumber(summaryData[key].digit)}</> // Formatage des autres valeurs numériques
                )}
              </div>
              {/* Affichage du libellé du résumé */}
              <div>{summaryData[key].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
