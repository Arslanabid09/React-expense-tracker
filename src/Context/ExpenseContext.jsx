import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const ExpenseContext = createContext();

// Custom Hook useExpense
export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
    const [income, setIncome] = useState(0);
    const [balance, setBalance] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [expenseTitle, setExpenseTitle] = useState(""); // State for title
    const [expenseAmount, setExpenseAmount] = useState(""); // State for amount
    const [error,setError] = useState('')
    // SweetAlert for income input
    const mySwal = withReactContent(Swal);
    const handleIncome = () => {
        mySwal.fire({
            title: <i>Add Your Income</i>,
            input: "number",
            inputPlaceholder: "Enter your income",
            inputValue: income,
            showCancelButton: true,
            confirmButtonText: "Add Income",
            cancelButtonText: "Cancel",
            inputValidator: (inputValue) => {
                if (!inputValue || isNaN(inputValue)) {
                    return "Please enter a valid number for income";
                }
            },
            preConfirm: () => {
                const inputValue = Swal.getInput().value;
                localStorage.setItem("income", inputValue);
                localStorage.setItem("balance", inputValue); // Set balance equal to income initially
                setIncome(inputValue);
                setBalance(inputValue);
            },
        });
    };

    // SweetAlert for expense input
    const handleExpense = () => {
        mySwal.fire({
            title: <i>Add Your Expense</i>,
            html: `
                <input type="text" id="expense-title" placeholder="Enter Your Expense" value="${expenseTitle}" 
                style="background-color: #F1F5F9; width: 75%; height: 2.5rem; border-radius: 0.5rem; padding: 0.5rem; margin:2rem;"
                />
                <input type="number" id="expense-amount" placeholder="Enter Expense Amount" value="${expenseAmount}" style="background-color: #F1F5F9; width: 75%; height: 2.5rem; border-radius: 0.5rem; padding: 0.5rem;" />
            `,
            showCancelButton: true,
            confirmButtonText: "Add Expense",
            cancelButtonText: "Cancel",
            preConfirm: () => {
                const title = document.getElementById("expense-title").value;
                const amount = document.getElementById("expense-amount").value;

                if (!title || !amount || isNaN(amount)) {
                    Swal.showValidationMessage("Please enter a valid title and amount");
                } else if(amount > balance) {
                    setError("Insufficient balance to add this expense. Please check your balance and try again")
                    setTimeout(() => {
                        setError("")    
                    }, 3000)
                    return false

                } else {
                    // Retrieve current expenses from localStorage
                    // let storedExpenses = JSON.parse(localStorage.getItem("expense")) || [];
                    const newExpense = { title, amount };

                    // Update expense array and balance
                    const updatedExpenses = [...expenses, newExpense];
                    localStorage.setItem("expense", JSON.stringify(updatedExpenses)); // Save updated expenses to localStorage
                    setExpenses(updatedExpenses); // Update state

                    const updatedBalance = balance - parseInt(amount);
                    localStorage.setItem("balance", updatedBalance);
                    setBalance(updatedBalance); // Update balance state

                    // Clear input states
                    setExpenseTitle("");
                    setExpenseAmount("");
                }
            },
        });

        // Attach input listeners manually (vanilla JS approach)
        document.getElementById("expense-title").oninput = (e) => {
            setExpenseTitle(e.target.value); // Update state when title changes
        };

        document.getElementById("expense-amount").oninput = (e) => {
            setExpenseAmount(e.target.value); // Update state when amount changes
        };
    };

    // useEffect to retrieve income and expenses from local storage
    useEffect(() => {
        const storedIncome = localStorage.getItem("income");
        const storedBalance = localStorage.getItem("balance");
        const storedExpenses = JSON.parse(localStorage.getItem("expense")) || [];

        if (storedIncome) {
            setIncome(storedIncome);
            setBalance(storedBalance || storedIncome);
        }
        setExpenses(storedExpenses);
    }, [income,balance]);

    return (
        <ExpenseContext.Provider value={{ income, balance, expenses, handleIncome, handleExpense,error }}>
            {children}
        </ExpenseContext.Provider>
    );
};
