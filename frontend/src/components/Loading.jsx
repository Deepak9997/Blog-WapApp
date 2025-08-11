import React from 'react'
import loadingIcon from '../assets/images/loading.svg'

const Loading = () => {
  return (
    <div className='w-full z-50 h-full rounded-xl flex flex-col justify-start pt-30 items-center absolute top-0 right-0'>
       <img className='w-20' src={loadingIcon} alt="" />
       <h2 className='text-purple-700 font-light text-3xl'>Loading...</h2>
    </div>
  )
}

export default Loading
