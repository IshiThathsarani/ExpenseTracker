import { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import TransactionForm from './components/TransactionForm';
import TransactionsList from './components/TransactionsList';
import { Container } from '@mui/material';



function App() {  

const [transactions, setTransactions] = useState([]);

useEffect(() => {
  fetchTransactions();
}, []);

async function fetchTransactions() {
  const res = await fetch('http://localhost:4000/transaction') //fetching data from db. no method == get
  const {data} = await res.json();
  setTransactions(data);
}
  return (
    <div>
      {/* COMPONENTS */}
      <AppBar />

      <Container>
        <TransactionForm  fetchTransactions={fetchTransactions}/>
        <TransactionsList 
          transactions={transactions}
          fetchTransactions={fetchTransactions}
        />
      </Container>

    </div>
  );
}

export default App;
