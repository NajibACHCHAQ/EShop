// Importation de Prisma pour interagir avec la base de données
import prisma from '@/libs/prismadb'

// Fonction asynchrone pour récupérer toutes les commandes avec les détails de l'utilisateur associé
export default async function getOrders() {
    try {
        // Récupération de toutes les commandes de la base de données
        const orders = await prisma.order.findMany({
            // Inclusion des détails de l'utilisateur associé à chaque commande
            include: {
                user: true // Inclusion de l'utilisateur associé à la commande
            },
            // Tri des commandes par date de création dans un ordre descendant
            orderBy: {
                createDate: 'desc' // Tri par date de création descendant
            }
        })
        
        // Retourner toutes les commandes récupérées avec les détails de l'utilisateur associé
        return orders
    } catch (error: any) {
        // En cas d'erreur lors de l'exécution de la fonction, la lever pour la gérer ailleurs
        throw new Error(error)
    }
}
