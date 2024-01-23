import React from 'react'
import AdminNav from '../components/admin/AdminNav'


export const metaData = {
    title:"E-shop Admin",
    description:"Panneau d'Administration"
}
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <AdminNav/>
        {children}
    </div>
  )
}

export default layout