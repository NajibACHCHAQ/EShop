'use client'
import React from 'react'
import Layout from './layout' // Import du composant de mise en page
import { Summary } from './Summary'
import { products } from '@/utils/products'
import getProducts from '@/actions/GetProducts'
import { Category } from '../components/navbar/Category'
import { get } from 'http'
import getOrders from '@/actions/GetOrders'
import getUsers from '@/actions/GetUsers'
import { Container } from '../components/Container'
import { BarGraph } from './BarGraph'
import getGraphData from '@/actions/GetGraphData'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import NullData from '../components/NullData'

// Définition du composant Admin
const Admin = async () => {
  // Récupération des produits, commandes, utilisateurs et données du graphique depuis les actions
  const products = await getProducts({ category: null })
  const orders = await getOrders()
  const users = await getUsers()
  const graphData = await getGraphData()
  const currentUser = await getCurrentUser()

  // Vérification des autorisations de l'utilisateur
  if (!currentUser || currentUser.role !== 'ADMIN') {
    // Si l'utilisateur n'est pas administrateur, afficher un message d'erreur
    return <NullData title="Oops vous n'avez pas acces"/>
  }

  // Affichage de la page d'administration
  return (
    <div className='pt-8'>
      {/* Utilisation du composant de mise en page pour inclure la barre de navigation */}
      <Layout>
        <Container>
          {/* Composant de résumé avec les données des produits, commandes et utilisateurs */}
          <Summary products={products} orders={orders} users={users}/>
          <div className='mt-4 mx-auto max-w-[1150px]'>
            {/* Graphique à barres avec les données du graphique */}
            <BarGraph data={graphData}/>
          </div>
        </Container>
      </Layout>
    </div>
  )
}

export default Admin
