import React, { useState } from 'react'

const Expensebox = ({
  icon,
  lable,
  price
}) => {
 
  return (
    <section className=' flex  gap-x-5'>
            <span className='font-bold rounded-full p-4 text-2xl bg-blue-300 hover:bg-blue-400'>
            {icon}
            </span>
            <div>
        <h1 className='text-xl md:text-2xl font-bold font-mono text-blue-900'>{lable}</h1>
        <p className='font-semibold text-xl'>{price}</p>
            </div>
    </section>
  )
}

export default Expensebox