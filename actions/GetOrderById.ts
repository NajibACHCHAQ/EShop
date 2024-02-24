// Importation de Prisma pour interagir avec la base de données
import prisma from '@/libs/prismadb'

// Définition d'une interface pour les paramètres de la fonction getOrderById
interface IParams {
    orderId?: string // L'identifiant de la commande est optionnel car il pourrait ne pas être fourni
}

// Fonction asynchrone qui récupère une commande à partir de son identifiant
export default async function getOrderById(params: IParams) {
    try {
        const { orderId } = params // Extraction de l'identifiant de la commande à partir des paramètres

        // Recherche de la commande dans la base de données en utilisant l'identifiant fourni
        const order = await prisma.order.findUnique({
            where: {
                id: orderId // Filtre sur l'identifiant de la commande
            }
        })

        // Si la commande n'est pas trouvée, retourner null
        if (!order)
            return null
        
        // Retourner la commande trouvée
        return order

    } catch (error: any) {
        // En cas d'erreur, la lever pour la gérer ailleurs
        throw new Error(error)
    }
}
