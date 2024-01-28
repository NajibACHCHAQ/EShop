'use client'
import React from 'react'

export const SearchBar = () => {
  return (
    <div className='flex items-center'>
        <input autoComplete='off' placeholder='Explore la boutique' type="text" className='p-2 rounded-l-md border-gray-300 rounded-1-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80' />
        <button className='bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md'>Recherche</button>
    </div>
  )
}
