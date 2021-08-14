import { useGlobalContext } from "./context/Context";
import { incomeCategories,expenseCategories,resetCategories } from "./constants/Categories";

 

const useTransactions = (title) => {
  resetCategories();
  const {transaction}=useGlobalContext();
  const transactionPerType=transaction.filter((t)=>t.type===title);
  const total=transactionPerType.reduce((acc,currVal)=>acc+=currVal.amount,0);
  const categories=title==='Income'?incomeCategories:expenseCategories;


  transactionPerType.forEach((t)=>{
      const category=categories.find((c)=> c.type===t.category);
      if(category) category.amount+=t.amount;
  })
const filteredCatefories=categories.filter((c)=>c.amount>0);

const chartData={
    datasets:[
        {
            data:filteredCatefories.map((fc)=>fc.amount),
            backgroundColor:filteredCatefories.map((fc)=>fc.color)
        }
        
    ],
    labels:filteredCatefories.map((fc)=>fc.type)
}
return  {total,chartData}

}

export default useTransactions


