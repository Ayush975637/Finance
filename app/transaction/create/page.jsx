// app/transaction/create/page.jsx
import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import  {AddTransactionForm} from "../_components/transaction-form";
const AddTransactionPage = async() => {
    const accounts = await getUserAccounts();
  return (
    <div className="max-w-3xl mx-auto px-6 mt-20">
    

    <h1 className="text-5xl font-extrabold tracking-tight mb-8 
    bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 
    text-transparent bg-clip-text 
    animate-gradient bg-[200%] bg-clip-text 
    drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">Add Transaction</h1>
        <AddTransactionForm accounts={accounts} categories={defaultCategories}></AddTransactionForm>
    </div>
  )
}

export default AddTransactionPage;
