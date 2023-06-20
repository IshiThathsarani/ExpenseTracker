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
import Cookies from 'js-cookie';
import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';


const InitialForm = {
  amount: 0,
  description: " ",
  date: " ",
  category: " "
}

export default function TransactionForm( { fetchTransactions, editTransaction }) { //passing edited data to transactionForm
  const [form, setForm] = useState(InitialForm);
  const token = Cookies.get('token');
  const categories =[
    {label: 'Food'},
    {label: 'Shopping'},
    {label: 'Travel'},
    {label: 'Transport'},
    {label: 'Other'},
  ]

  useEffect(() => {
    if(editTransaction.amount !== undefined && form !== editTransaction) {
      setForm(editTransaction);
    }
    
    console.log(editTransaction);
  }, [editTransaction, form]);
  
  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleDate(newValue) {
    setForm({...form, date: newValue});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = editTransaction.amount === undefined ? await create() : await update();    
    
  }
  function reload(res) {
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
        "Authorization": `Bearer ${token}` //token is stored in local storage
      }
    });
    reload(res);
  }
  async function update() {
    const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`,
    { 
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    });
    reload(res);
  }

  return (
    <Card sx={{ minWidth: 200, marginTop: 10 }}>
      <CardContent>
        
          <Typography variant="h6">
            Add new transaction            
          </Typography>
          <Box component="form" onSubmit={handleSubmit} display='flex'>
          <TextField 
            id="outlined-basic" 
            label="Amount" 
            name="amount"
            variant="outlined" 
            sx={{marginRight: 3}}
            value={form.amount}
            onChange={handleChange}
            size='small'
          />
          <TextField 
            id="outlined-basic" 
            label="Description"
            name="description" 
            variant="outlined" 
            sx={{marginRight: 3}}
            value={form.description}
            onChange={handleChange}
            size='small'
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker 
              label="Transaction Date"
              name="date"
              inputFormat="MM/DD/YYYY"
              onChange={handleDate}
              sx={{marginRight: 3}} 
              value={dayjs(form.date)} 
              size='small'          
              renderInput={(params) => 
                <TextField  {...params} size='small'/>}

            />            
          </LocalizationProvider>

          <Autocomplete
            value={form.category}
            onChange={(event, newValue) => {
              setForm({ ...form, category:newValue.label });
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 3 }}
            renderInput={(params) => 
              <TextField 
              {...params} 
              label="Category"               
              size='small'
              />}
          />
          {
            editTransaction.amount !== undefined &&
            <Button type="submit" variant="contained">
              Update
            </Button>
          }
          {
            editTransaction.amount === undefined &&
            <Button type="submit" variant="contained">
              Submit
            </Button>
          }       
            </Box> 
      </CardContent>      
    </Card>
  );
}