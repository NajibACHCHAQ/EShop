import React from 'react'
import AdminNav from '../components/admin/AdminNav'


const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <AdminNav/>
        {children}
    </div>
  )
}

export default layout