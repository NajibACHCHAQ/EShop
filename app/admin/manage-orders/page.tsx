import React from 'react'
import { ManageOrdersClient } from './ManageOrdersClient'
import { Container } from '@/app/components/Container'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import NullData from '@/app/components/NullData'
import getOrders from '@/actions/GetOrders'

const ManageOrders = async () => {
  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title="Oops vous n'avez pas acces"/>
}
  return (
    <div>
      <Container>
      <ManageOrdersClient orders ={orders}/>
      </Container>
      
    </div>
  )
}

export default ManageOrders