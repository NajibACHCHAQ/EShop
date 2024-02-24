import React from 'react'
import AdminNav from '../components/admin/AdminNav'

// Définition du composant de mise en page
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Affichage de la barre de navigation de l'administrateur */}
      <AdminNav />
      {/* Affichage du contenu de la page qui sera passé en tant qu'enfant */}
      {children}
    </div>
  )
}

export default Layout
