import React from 'react'
import { FaReceipt } from 'react-icons/fa'

const History = ({
  icon,
  expenseTitle,
  amount
}) => {
  return (
    <section className='bg-slate-200 w-4/5 max-w-md h-auto text-center rounded-md shadow-lg p-3 overflow-hidden'>
      <span className='text-2xl text-blue-700'>{icon}</span>
      <h2 className='font-bold text-2xl font-mono break-words'>{expenseTitle}</h2>
      <h3 className='font-bold text-start text-xl'>{amount}</h3>
    </section>
  )
}

export default History
