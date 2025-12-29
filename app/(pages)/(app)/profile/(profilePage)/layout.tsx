import React, { PropsWithChildren } from 'react'

const layout = ({children}: PropsWithChildren) => {
  return (
    <div className='h-full bg-white'>{children}</div>
  )
}

export default layout