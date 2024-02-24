'use client'
import React from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip , Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Enregistrement des composants requis de Chart.js
ChartJS.register( BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Définition du type pour les données du graphique en barres
interface BarGraphProps{
    data: GraphData[]
}
type GraphData = {
    day:string;
    date:string;
    totalAmount:number;
}

// Composant fonctionnel BarGraph pour afficher un graphique en barres
export const BarGraph:React.FC<BarGraphProps> = ({data}) => {
    // Extraction des étiquettes et des montants à partir des données
    const labels = data.map(item => item.day) // Les jours seront les étiquettes sur l'axe des x
    const amounts = data.map(item => item.totalAmount) // Les montants seront les valeurs sur l'axe des y

    // Définition des données du graphique
    const chartData ={
      labels: labels, // Les étiquettes des jours
      datasets: [
        {
          label: 'Montant des ventes', // Libellé du jeu de données
          data: amounts, // Les montants des ventes
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Couleur de fond des barres
          borderColor: 'rgba(75, 192, 192, 0.6)', // Couleur de bordure des barres
          borderWidth: 1 // Largeur de la bordure des barres
        }
      ]
    }

    // Définition des options du graphique
    const options = {
      scales: {
        y: {
          beginAtZero: true // Commencer l'axe des y à zéro
        }
      }
    }

    console.log(data) // Affichage des données dans la console pour débogage

    // Rendu du composant du graphique en barres
    return (
      <Bar data={chartData} options={options}></Bar>
    )
}
