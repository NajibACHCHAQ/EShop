import React from 'react'
import { ManageProductsClient } from './ManageProductsClient'
import { Container } from '@/app/components/Container'
import getProducts from '@/actions/GetProducts'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import NullData from '@/app/components/NullData'

const ManageProduct = async () => {
  const products = await getProducts({category:null})
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== 'ADMIN'){
    return <NullData title="Oops vous n'avez pas acces"/>
}
  return (
    <div>
      <Container>
      <ManageProductsClient products ={products}/>
      </Container>
      
    </div>
  )
}

export default ManageProduct