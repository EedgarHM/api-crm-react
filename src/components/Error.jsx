import React from 'react'

const Error = ({ children }) => {
  return (
    <div className='text-center p-3 my-4 bg-red-600 text-white font-bold uppercase'>

        {children}
    </div>
  )
}

export default Error