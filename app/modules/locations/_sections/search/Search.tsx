import MobileSearchBox from '@/app/modules/home/_sections/search/MobileSearchBox'
import React from 'react'

const Search = () => {
  return (
    <div className="ml-1 h-10 flex-grow">
      <MobileSearchBox btn={
        <div className='bg-gray-100 rounded-full h-full flex items-center px-4'>
          <i className="fa-regular fa-search ml-1 text-purple-2 text-base"></i>
          <span className='text-xs text-gray-600'>جستجو</span>
        </div>
      } />
    </div>
  )
}

export default Search