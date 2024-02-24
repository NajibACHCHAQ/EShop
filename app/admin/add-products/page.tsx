// Importation des composants nécessaires depuis les fichiers locaux
import { Container } from '@/app/components/Container'; // Container pour encadrer le formulaire
import { FormWrap } from '@/app/components/FormWrap'; // FormWrap pour envelopper le formulaire
import React from 'react'; // React pour la création de composants
import { AddProductForm } from './AddProductForm'; // Composant de formulaire pour ajouter un produit
import { getCurrentUser } from '@/actions/GetCurrentUser'; // Fonction pour récupérer l'utilisateur actuel
import NullData from '@/app/components/NullData'; // Composant pour afficher des données nulles

// Page pour ajouter un produit
const AddProduct = async () => {
  // Récupération de l'utilisateur actuel
  const currentUser = await getCurrentUser();

  // Vérification si l'utilisateur actuel est connecté et a le rôle d'ADMIN
  if (!currentUser || currentUser.role !== 'ADMIN') {
    // Si l'utilisateur n'est pas connecté ou n'a pas le rôle d'ADMIN, afficher un message d'erreur
    return <NullData title="Oops vous n'avez pas accès" />;
  }

  // Si l'utilisateur est connecté et a le rôle d'ADMIN, afficher le formulaire pour ajouter un produit
  return (
    <div className='p-8'>
        {/* Conteneur pour aligner le formulaire au centre de la page */}
        <Container>
            {/* Enveloppe pour le formulaire */}
            <FormWrap>
                {/* Composant de formulaire pour ajouter un produit */}
                <AddProductForm/>
            </FormWrap>
        </Container>
    </div>
  );
};

export default AddProduct; // Exportation de la page
