import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';


export default function TransactionsList({transactions, fetchTransactions}) {

  async function remove(_id) {
    if(!window.confirm('Are you sure you want to delete this transaction?')) return;
    const res = await fetch(`http://localhost:4000/transaction/${_id}`,{
      method: 'DELETE'
    });
    if(res.ok){
      fetchTransactions();
      window.alert('Transaction deleted successfully');
    }
  }

  return (
    <>
    <Typography sx={{marginTop:3}} variant="h6">
      Lists of Transactions
    </Typography>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.amount}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
                  <IconButton color="primary" component="label">
                    <EditSharpIcon />
                  </IconButton>     
                  <IconButton color="warning" component="label" onClick={() => remove(row._id)}>
                    <DeleteSharpIcon />
                  </IconButton>        
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}