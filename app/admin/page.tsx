import React from 'react'
import layout from './layout'
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
const Admin = async () => {
  const products = await getProducts({category:null})
  const orders = await getOrders()
  const users = await getUsers()
  const graphData = await getGraphData()
  return (
    <div className='pt-8'>
      <Container>
      <Summary products={products} orders={orders} users={users}/>
      <div className='mt-4 mx-auto max-w-[1150px]'>
        <BarGraph data={graphData}/>
      </div>
      </Container>
      </div>
  )
}

export default Admin