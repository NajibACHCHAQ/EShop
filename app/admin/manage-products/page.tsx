import React from 'react'
import { ManageProductsClient } from './ManageProductsClient'
import { Container } from '@/app/components/Container'
import getProducts from '@/actions/GetProducts'
import { getCurrentUser } from '@/actions/GetCurrentUser'
import NullData from '@/app/components/NullData'

const ManageProduct = async () => {
    // Récupération des produits depuis la base de données
    const products = await getProducts({ category: null })
    
    // Récupération de l'utilisateur actuel
    const currentUser = await getCurrentUser()

    // Vérification du rôle de l'utilisateur
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title="Oops vous n'avez pas acces"/>
    }
    
    // Rendu du composant de gestion des produits
    return (
        <div>
            <Container>
                <ManageProductsClient products={products}/>
            </Container>
        </div>
    )
}

export default ManageProduct
