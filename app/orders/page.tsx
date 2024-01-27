import React from 'react'
import { Container } from '@/app/components/Container'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import NullData from '@/app/components/NullData'
import { OrdersClient } from './OrdersClient'
import getOrdersByUserId from '@/actions/GetOrdersByUserId'

const Orders = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return <NullData title="Oops vous n'avez pas acces"/>
    }
    const orders = await getOrdersByUserId(currentUser.id)
    if(!orders){
        return <NullData title="Pas encore de commande"/>
        }
  return (
    <div>
      <Container>
      <OrdersClient orders ={orders}/>
      </Container>
      
    </div>
  )
}

export default Orders