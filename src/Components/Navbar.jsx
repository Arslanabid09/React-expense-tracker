import React, { useState } from 'react';
import { FaBars, FaArrowDown } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useExpense } from '../Context/ExpenseContext';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  // const [value, setValue] = useState('');
  let {handleIncome,handleExpense} = useExpense();

  // SweetAlert2 function with placeholder and validation
  // const showSwal = () => {
  //   const MySwal = withReactContent(Swal);

  //   MySwal.fire({
  //     title: <i>Add Your Income</i>,
  //     input: 'text',
  //     inputPlaceholder: 'Enter your income', // Add placeholder here
  //     inputValue: value,
  //     showCancelButton: true, // Adds a cancel button
  //     confirmButtonText: 'Add Income',
  //     cancelButtonText: 'Cancel',
  //     inputValidator: (inputValue) => {
  //       if (!inputValue || isNaN(inputValue)) {
  //         return 'Please enter a valid number for income'; // Validation message
  //       }
  //     },
  //     preConfirm: () => {
  //       const inputValue = Swal.getInput().value;
  //       setValue(inputValue || '');
  //     }
  //   });
  // };

  return (
    <header>
      <div className='flex justify-between md:justify-around md:py-5 py-2 px-2 border-b-2 shadow-md'>
        <h1 className='font-semibold text-2xl md:text-3xl text-slate-700'>Expense Tracker</h1>
        <input type='text' />
        <span
          className='font-bold text-xl cursor-pointer bg-blue-900 text-white px-2 py-2'
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? <FaArrowDown /> : <FaBars />}
        </span>
      </div>

      <div
        className={`flex flex-col-reverse items-end transition-all duration-500 ease-in-out transform ${
          toggle ? 'translate-y-0 opacity-100' : 'cursor-default -translate-y-72 opacity-0'
        }`}
      >
        {/* Dropdown Section */}
        <div className='flex gap-5 p-5 bg-slate-200'>
          <button className='bg-blue-800 hover:bg-blue-900 font-bold text-white px-3 py-2 rounded-md text-lg'
          onClick={handleExpense}
          >
            Add Expense
          </button>
          <button
            className='bg-green-600 hover:bg-green-700 font-bold text-white px-3 py-2 rounded-md text-lg'
            onClick={handleIncome}
          >
            Add Income
          </button>
          {/* <div>{value && <p>Income Added: {value}</p>}</div> */}
          <img
            className='rounded-full w-10 cursor-pointer'
            src='https://xsgames.co/randomusers/avatar.php?g=pixel'
            alt='User-Profile'
            loading='lazy'
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
