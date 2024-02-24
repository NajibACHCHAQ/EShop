// Importation des options d'authentification du fichier [nextauth].js situé dans le dossier /pages/api/auth/
import { authOptions } from "@/pages/api/auth/[...nextauth]"
// Importation de la fonction getServerSession de next-auth pour récupérer la session côté serveur
import { getServerSession } from "next-auth"
// Importation de l'instance de prisma pour accéder à la base de données
import prisma from '@/libs/prismadb'

// Fonction asynchrone pour récupérer la session utilisateur
export async function getSession(){
    // Utilisation de la fonction getServerSession avec les options d'authentification importées
    return await getServerSession(authOptions)
}

// Fonction asynchrone pour récupérer l'utilisateur actuellement connecté
export async function getCurrentUser(){
    try {
        // Récupération de la session utilisateur en utilisant la fonction getSession
        const session = await getSession()
        // Vérification si l'email de l'utilisateur est présent dans la session
        if(!session?.user?.email){
            // Si l'email n'est pas présent, peut-être une action à prendre ici, comme rediriger l'utilisateur vers la page de connexion
        }
        // Recherche de l'utilisateur dans la base de données en utilisant l'email de la session
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!, // Utilisation de l'email de la session pour trouver l'utilisateur
            },
            include: { orders: true }, // Inclusion des commandes associées à l'utilisateur
        });
        // Si aucun utilisateur correspondant n'est trouvé, retourner null
        if(!currentUser){
            return null
        }
        // Retourner les détails de l'utilisateur avec certaines informations formatées
        return {
            ...currentUser,
            createdAt: currentUser.createAt.toISOString(), // Conversion de la date de création en format ISO
            updatedAt: currentUser.updatedAt.toISOString(), // Conversion de la date de mise à jour en format ISO
            emailVerified: currentUser.emailVerified?.toISOString() || null // Conversion de la date de vérification de l'email en format ISO ou null si non définie
        }
    } catch (error:any) {
        // En cas d'erreur, retourner null
        return null
    }
}
