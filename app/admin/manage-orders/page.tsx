import React from 'react'
import { ManageOrdersClient } from './ManageOrdersClient'
import { Container } from '@/app/components/Container'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import NullData from '@/app/components/NullData'
import getOrders from '@/actions/GetOrders'

const ManageOrders = async () => {
  // Récupération des commandes
  const orders = await getOrders()
  
  // Récupération de l'utilisateur actuel
  const currentUser = await getCurrentUser()

  // Vérification des autorisations de l'utilisateur
  if (!currentUser || currentUser.role !== 'ADMIN') {
    // Affichage d'un message d'erreur si l'utilisateur n'est pas administrateur
    return <NullData title="Oops vous n'avez pas accès"/>
  }

  // Affichage de la liste des commandes dans un composant de gestion
  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders}/>
      </Container>
    </div>
  )
}

export default ManageOrders
