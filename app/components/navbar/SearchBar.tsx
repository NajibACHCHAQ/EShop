'use client'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
// Importez la fonction de recherche (assurez-vous que le chemin est correct)
import searchProducts from '@/actions/GetProducts';

export const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    if (!data.searchTerm) return router.push('/');

    try {
      // Utilisez la fonction de recherche pour obtenir les produits correspondant à la recherche
      const searchResults = await searchProducts({ searchTerm: data.searchTerm });

      // Effectuez une action avec les résultats, par exemple, naviguez vers une page de résultats
      // router.push('/search-results', { results: searchResults });

      // Pour l'instant, nous affichons simplement les résultats dans la console
      console.log('Search Results:', searchResults);
    } catch (error) {
      console.error('Error during search:', error);
    }

    reset();
  };

  return (
    <div className='flex items-center'>
      <input
        {...register('searchTerm')}
        autoComplete='off'
        placeholder='Explore la boutique'
        type="text"
        className='p-2 rounded-l-md border-gray-300 rounded-1-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80'
      />
      <button onClick={handleSubmit(onSubmit)} className='bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md'>Recherche</button>
    </div>
  );
};
