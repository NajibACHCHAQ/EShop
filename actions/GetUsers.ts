// Importation des modules nécessaires - en supposant que 'prismadb' contient le client Prisma
import prisma from '@/libs/prismadb';

// Fonction pour récupérer les utilisateurs
export default async function getUsers() {
  try {
    // Récupération des utilisateurs en utilisant le modèle utilisateur de Prisma
    const users = await prisma?.user.findMany(); // Utilisation de la chaîne optionnelle pour gérer la possibilité que 'prisma' soit null ou undefined
    return users; // Retourne les utilisateurs récupérés
  } catch (error:any) { // Capture des erreurs qui se produisent pendant l'opération de la base de données
    // Gestion des erreurs en lançant une nouvelle erreur
    throw new Error(error);
  }
}
