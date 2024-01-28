'use client'
import React from 'react'
import { Container } from '../Container'
import { categories } from '@/utils/Categories'
import { Category } from './Category'
import { usePathname, useSearchParams } from 'next/navigation'

export const Categories= () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  if(!isMainPage) return null
  return (
    <div className='w-[65%] '>
        <Container>
        <div className='pt-4 flex flex-col items-center justify-between md:flex-row'>
        {categories.map((item) => (
          <Category
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label || (category === null && item.label === 'All')}
          />
        ))}
</div>
        </Container>
    </div>
  )
}
