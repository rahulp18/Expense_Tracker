import React,{useReducer,createContext, useContext} from 'react';
import contextReducer from './contextReducer';
const initialState=JSON.parse(localStorage.getItem("transactions")) ||[
    {
        "amount": 2000,
        "category": "Food",
        "type": "Expense",
        "date": "2021-08-16",
        "id": "ab378f1e-9729-438b-9a19-f85863a61462"
    },
    {
        "amount": 2000,
        "category": "Investments",
        "type": "Income",
        "date": "2021-08-21",
        "id": "1c44aaee-a9fc-4532-a952-462de81e5a93"
    },
    {
        "amount": 4000,
        "category": "Salary",
        "type": "Income",
        "date": "2021-08-14",
        "id": "caf6cc13-9404-4008-a6c7-fcb14c396862"
    },
    {
        "amount": 220,
        "category": "Bills",
        "type": "Expense",
        "date": "2021-08-14",
        "id": "76436c3f-b8b6-48c4-8bc5-042b75523f5a"
    }
];

export const ExpenseTrackerContext=createContext(initialState);
 
export const Provider=({children})=>{
    const [transaction, dispatch] = useReducer(contextReducer, initialState);

// Action Creater 
const deleteTransactions=(id)=>{
 dispatch({type:'DELETE_TRANSACTION',payload:id})
} 
const addTransactions=(transaction)=>{
    dispatch({type:'ADD_TRANSACTION',payload:transaction})
    
   } 
  const balance =transaction.reduce((acc,curVal)=>{
           return(curVal.type==='Expense'?acc-curVal.amount:acc+curVal.amount)
  },0);
    return(
        <ExpenseTrackerContext.Provider value={{addTransactions,deleteTransactions,transaction,balance}}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
export const useGlobalContext=()=>{
    return useContext(ExpenseTrackerContext);
}