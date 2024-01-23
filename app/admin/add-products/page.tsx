import { Container } from '@/app/components/Container'
import { FormWrap } from '@/app/components/FormWrap'
import React from 'react'
import { AddProductForm } from './AddProductForm'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import NullData from '@/app/components/NullData'

const AddProduct = async () => {
  const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Oops vous n'avez pas acces"/>
    }
  return (
    <div className='p-8'>
        <Container>
            <FormWrap>
                <AddProductForm/>
            </FormWrap>
        </Container>
    </div>
  )
}

export default AddProduct