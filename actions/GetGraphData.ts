// Importation de l'instance de prisma pour accéder à la base de données
import prisma from '@/libs/prismadb';
// Importation de Moment.js pour la manipulation des dates
import moment from 'moment';
// Importation du module de localisation français pour Moment.js
import 'moment/locale/fr'; 

// Configuration de Moment.js pour utiliser la localisation française
moment.locale('fr'); 

// Fonction asynchrone pour récupérer les données graphiques
export default async function getGraphData() {
  try {
    // Définition de la date de début comme 6 jours avant aujourd'hui à partir du début de la journée
    const startDate = moment().subtract(6, 'days').startOf('day');
    // Définition de la date de fin comme la fin de la journée d'aujourd'hui
    const endDate = moment().endOf('day');

    // Requête à la base de données pour regrouper les commandes par date de création
    const result = await prisma.order.groupBy({
      by: ['createDate'], // Groupement par date de création
      where: {
        createDate: {
          gte: startDate.toISOString(), // Date de création supérieure ou égale à la date de début
          lte: endDate.toISOString(), // Date de création inférieure ou égale à la date de fin
        },
        status: 'complete', // Seules les commandes avec le statut "complete" sont considérées
      },
      _sum: {
        amount: true, // Somme des montants des commandes
      },
    });

    // Initialisation d'un objet pour stocker les données agrégées par jour
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    // Initialisation d'une variable pour parcourir chaque jour entre la date de début et la date de fin
    const currentDate = startDate.clone();

    // Boucle tant que la date actuelle est inférieure ou égale à la date de fin
    while (currentDate <= endDate) {
        // Formatage du jour actuel en format complet (nom du jour)
        const day = currentDate.format('dddd');
        // Création d'une entrée pour le jour actuel dans les données agrégées
        aggregatedData[day] = {
          day,
          date: currentDate.toISOString(), // Utilisation du format ISO8601 pour la date
          totalAmount: 0, // Initialisation du montant total à 0
        };
        // Passage au jour suivant
        currentDate.add(1, 'day');
    }

    // Parcours des résultats de la requête à la base de données
    result.forEach((entry) => {
      // Formatage de la date de création de la commande en nom du jour
      const day = moment(entry.createDate).format('dddd');
      // Récupération du montant total de la commande ou 0 si non défini
      const amount = entry._sum.amount || 0;
      // Ajout du montant total à la journée correspondante dans les données agrégées
      aggregatedData[day].totalAmount += amount;
    });

    // Conversion de l'objet d'agrégation en tableau et tri par date
    const formatData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    // Retour des données formatées
    return formatData;
  } catch (error: any) {
    // En cas d'erreur, lancer une nouvelle erreur avec le message d'erreur
    throw new Error(error);
  }
}
