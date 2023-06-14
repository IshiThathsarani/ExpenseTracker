import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';

export default function TransactionForm() {
  function handleChange() {
    
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <form>
          <Typography variant="h6">
            Add new transaction            
          </Typography>
          <TextField 
            id="outlined-basic" 
            label="Amount" 
            variant="outlined" 
            sx={{marginRight: 3}}
            
          />
          <TextField 
            id="outlined-basic" 
            label="Description" 
            variant="outlined" 
            sx={{marginRight: 3}}
            
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker 
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              onChange={handleChange}
              sx={{marginRight: 3}}              
              renderInput={(params) => 
                <TextField  {...params} />}

            />            
          </LocalizationProvider>
          <Button type="submit" variant="contained">Submit</Button>
        </form>
        
       
      </CardContent>      
    </Card>
  );
}