'use client'
// Importation des modules nécessaires pour le composant Button
'use client';
import { Icon } from '@mui/material';
import React from 'react';
import { IconType } from 'react-icons';

// Définition des types pour les propriétés du composant Button
interface ButtonProps {
    label: string; // Texte du bouton
    disabled?: boolean; // Option pour désactiver le bouton
    outline?: boolean; // Option pour rendre le bouton avec un contour seulement 
    small?: boolean; // Option pour rendre le bouton plus petit
    custom?: string; // Classe CSS personnalisée pour le bouton
    icon?: IconType; // Type d'icône à afficher à côté du texte
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Fonction de rappel pour gérer le clic sur le bouton
}

// Composant Button
export const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    
    custom,
    icon: Icon, // Le composant d'icône
    onClick,
}) => {
    return (
        <button
            disabled={disabled}
            className={`
                disabled:opacity-70
                diasabled:cursor-not-allowed
                rounded-md
                hover:opacity-80
                transition
                w-full
                border-slate-700
                flex
                items-center
                justify-center
                gap-2
                ${outline ? 'bg-white' : 'bg-slate-700'}
                ${outline ? 'text-slate-700' : 'text-white'}
                ${small ? 'text-sm font-light' : 'text-md font-semibold'}
                ${small ? 'py-1 px-2 border-[1px]' : 'py-3 px-4 border-2'}
                ${custom ? custom : ''}
                
            `}
            onClick={onClick}
        >
            {Icon && <Icon size={24} />} {/* Affichage de l'icône si elle est spécifiée */}
            {label}
        </button>
    );
};
