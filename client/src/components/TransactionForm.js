import * as React from 'react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';


const InitialForm = {
  amount: 0,
  description: " ",
  date: " "
}

export default function TransactionForm( { fetchTransactions, editTransaction }) { //passing edited data to transactionForm
  const [form, setForm] = useState(InitialForm);

  useEffect(() => {
    if(editTransaction !== {}) {
      setForm(editTransaction);
    }
    
    console.log(editTransaction);
  }, [editTransaction]);
  
  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleDate(newValue) {
    setForm({...form, date: newValue});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = editTransaction === {} ? await create() : await update();    
    
    if(res.ok) {
      setForm(InitialForm)
      fetchTransactions();
    } 
  }

  async function create() {
    const res = await fetch('http://localhost:4000/transaction',
    { //creating a new transaction
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      }
    });
    return res;
  }
  async function update() {
    const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`,
    { 
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      }
    });
    return res;
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">
            Add new transaction            
          </Typography>
          <TextField 
            id="outlined-basic" 
            label="Amount" 
            name="amount"
            variant="outlined" 
            sx={{marginRight: 3}}
            value={form.amount}
            onChange={handleChange}
          />
          <TextField 
            id="outlined-basic" 
            label="Description"
            name="description" 
            variant="outlined" 
            sx={{marginRight: 3}}
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker 
              label="Transaction Date"
              name="date"
              inputFormat="MM/DD/YYYY"
              onChange={handleDate}
              sx={{marginRight: 3}} 
              value={dayjs(form.date)}           
              renderInput={(params) => 
                <TextField  {...params} />}

            />            
          </LocalizationProvider>
          {
            editTransaction !== {} &&
            <Button type="submit" variant="contained">
              Update
            </Button>
          }
          {
            editTransaction === {} &&
            <Button type="submit" variant="contained">
              Submit
            </Button>
          }
          
        </form>       
      </CardContent>      
    </Card>
  );
}