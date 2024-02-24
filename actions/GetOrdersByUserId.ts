// Importation de Prisma pour interagir avec la base de données
import prisma from '@/libs/prismadb'

// Fonction asynchrone pour récupérer toutes les commandes d'un utilisateur spécifique en fonction de son identifiant
export default async function getOrdersByUserId(userId: string) {
    try {
        // Récupération de toutes les commandes de la base de données pour l'utilisateur spécifié
        const orders = await prisma.order.findMany({
            // Inclusion des détails de l'utilisateur associé à chaque commande
            include: {
                user: true // Inclusion de l'utilisateur associé à la commande
            },
            // Tri des commandes par date de création dans un ordre descendant
            orderBy: {
                createDate: 'desc' // Tri par date de création descendant
            },
            // Filtrage des commandes pour celles appartenant à l'utilisateur spécifié
            where: {
                userId: userId // Filtre sur l'identifiant de l'utilisateur
            }
        })
        
        // Retourner toutes les commandes récupérées pour l'utilisateur spécifié
        return orders
    } catch (error: any) {
        // En cas d'erreur lors de l'exécution de la fonction, la lever pour la gérer ailleurs
        throw new Error(error)
    }
}
