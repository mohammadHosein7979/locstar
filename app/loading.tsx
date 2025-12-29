import { CircularProgress } from '@mui/material'
import React from 'react'
import { loadingString } from './constants/strings'

const loading = () => {
  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <CircularProgress />
      <div className='font-medium mr-2'>{loadingString}</div>
    </div>
  )
}

export default loading