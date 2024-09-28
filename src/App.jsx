import React from "react";
import Navbar from "./Components/Navbar";
import Expensebox from "./Components/Expensebox";
import { FaMoneyBillWave,FaReceipt, FaWallet } from "react-icons/fa";
import History from "./Components/History";
import { useExpense } from "./Context/ExpenseContext";

function App() {
  let {income,balance,expenses,error} = useExpense();
  return (
    <>
      <main>
      
          <Navbar />
        
        <div className="w-3/4 md:w-full  flex flex-col justify-center items-center px-10 gap-10 h-auto mx-auto">
          <h1 className="text-3xl font-extrabold mr-64 md:mr-0
          md:text-5xl  text-sky-900">Budget</h1>
         
          <div className="bg-slate-200 shadow-xl px-10 py-10 flex md:flex-row flex-col justify-around rounded-lg gap-24 w-full md:w-3/4  mx-auto h-3/4">
            <Expensebox lable={'Balance'} price={`${balance}Rs`} icon={<FaWallet/>} />
            <Expensebox lable={'Income'} price={`${income}Rs`} icon={<FaMoneyBillWave/>}  />
          </div>
          {error}
        </div>
       
          <div  className=" mt-16 mb-10 ">
            <h1 className="font-extrabold text-2xl mx-10 my-10 md:text-5xl ">Expenses</h1>
            <div className="grid grid-cols-2 w-auto md:grid-cols-3 lg:grid-cols-4 gap-y-9 place-items-center ">
            {expenses.map((expense,index) => (
              <History key={index} amount={expense.amount} expenseTitle={expense.title} icon={<FaReceipt/>}/>
            ))}        
         
            </div>
          </div>
      </main>
    </>
  );
}

export default App;
