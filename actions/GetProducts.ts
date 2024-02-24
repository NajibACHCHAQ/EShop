// Importation de Prisma pour interagir avec la base de données
import prisma from '@/libs/prismadb'

// Définition d'une interface pour les paramètres de la fonction getProducts
export interface IProductParams {
    category?: string | null; // La catégorie du produit est optionnelle car elle pourrait ne pas être fournie
    searchTerm?: string | null; // Le terme de recherche est optionnel car il pourrait ne pas être fourni
}

// Fonction asynchrone qui récupère une liste de produits en fonction des paramètres fournis
export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params; // Extraction des paramètres de recherche

        let searchString = searchTerm || ''; // Initialisation de la chaîne de recherche avec le terme fourni, sinon une chaîne vide

        let query: any = {}; // Initialisation de l'objet de requête pour filtrer par catégorie

        if (category) {
            query.category = category; // Si une catégorie est spécifiée, filtrer par cette catégorie
        }

        // Recherche de produits dans la base de données en utilisant les critères de recherche spécifiés
        const products = await prisma.product.findMany({
            where: {
                ...query, // Filtrage par catégorie
                OR: [
                    {   // Recherche par nom ou description contenant la chaîne de recherche
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                    }
                ]
            },
            include: {
                reviews: { // Inclusion des critiques associées à chaque produit
                    include: {
                        user: true // Inclusion de l'utilisateur associé à chaque critique
                    },
                    orderBy: {
                        createdDate: 'desc' // Tri des critiques par date de création dans un ordre descendant
                    }
                }
            }
        });

        // Retourner la liste de produits récupérée
        return products;
    } catch (error: any) {
        // En cas d'erreur lors de l'exécution de la fonction, la lever pour la gérer ailleurs
        throw new Error(error);
    }
}
