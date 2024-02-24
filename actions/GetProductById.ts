// Importation de Prisma pour interagir avec la base de données
import prisma from '@/libs/prismadb'

// Définition d'une interface pour les paramètres de la fonction getProductById
interface IParams {
    productId?: string // L'identifiant du produit est optionnel car il pourrait ne pas être fourni
}

// Fonction asynchrone qui récupère un produit à partir de son identifiant
export default async function getProductById(params: IParams) {
    try {
        const { productId } = params // Extraction de l'identifiant du produit à partir des paramètres

        // Recherche du produit dans la base de données en utilisant l'identifiant fourni
        const product = await prisma.product.findUnique({
            where: {
                id: productId // Filtre sur l'identifiant du produit
            },
            include: {
                reviews: { // Inclusion des critiques associées au produit
                    include: {
                        user: true // Inclusion de l'utilisateur associé à chaque critique
                    },
                    orderBy: {
                        createdDate: 'desc' // Tri des critiques par date de création dans un ordre descendant
                    }
                }
            }
        })

        // Si le produit n'est pas trouvé, retourner null
        if (!product)
            return null
        
        // Retourner le produit trouvé avec ses éventuelles critiques associées
        return product

    } catch (error: any) {
        // En cas d'erreur lors de l'exécution de la fonction, la lever pour la gérer ailleurs
        throw new Error(error)
    }
}
