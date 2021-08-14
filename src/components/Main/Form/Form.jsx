import React, { useState,useEffect } from 'react'
import { TextField, Typography, Grid, FormControl, Button, Select, InputLabel, MenuItem } from '@material-ui/core'
import useStyles from './style'
import { useGlobalContext } from '../../../context/Context'
import { v4 as uuidv4 } from 'uuid'
import { incomeCategories, expenseCategories } from '../../../constants/Categories'
import formatDate from '../../../utils/formatDate'
import { useSpeechContext } from '@speechly/react-client'
import CustomizeSnackbar from '../../SnackBar/SnackBar'
const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date())
}
const Form = () => {
    const { addTransactions } = useGlobalContext();
    const { segment } = useSpeechContext();
    const [open,setOpen]=useState(false);
    // Add function
    const createTransaction = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        const transation = { ...formData, amount: Number(formData.amount), id: uuidv4() }
        addTransactions(transation);
        setFormData(initialState);
        setOpen(true);
    }


    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    // Categories 
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

useEffect(() => {

  if(segment){
      if(segment.intent.intent==="add_expense"){
          setFormData({...formData,type:"Expense"});
      }else if(segment.intent.intent==="add_Income"){
          setFormData({...formData,type:"Income"});
      }
      else if(segment.isFinal && segment.intent.intent==='create_transaction'){
          return createTransaction()
      }
      else if(segment.isFinal && segment.intent.intent==='cancel_transaction'){
        return setFormData(initialState);
    }
    segment.entities.forEach((e)=>{
        const category=`${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
         switch(e.type){
             case 'amount':
                 setFormData({...formData,amount:e.value});
                 break;
             case 'category':
                 if(incomeCategories.map((ic)=>ic.type).includes(category)){
                    setFormData({...formData,type:'Income',category }) 
                 }
                 else if (expenseCategories.map((ic)=>ic.type).includes(category)){
                    setFormData({...formData,type:'Expense',category }) 
                 }
                 
                 break;
             case 'date':
                 setFormData({...formData,date:e.value})  ;
                 break;
             default:
                 break;         
         }
    });
    if(segment.isFinal && formData.date && formData.amount && formData.category){
        createTransaction();
    }
  }


}, [segment])



    return (
        <Grid container spacing={2}>
            <CustomizeSnackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography variant='subtitle2' align='center' gutterBottom >
                    {
                        segment && segment.words.map((w) => w.value).join(" ")

                    }
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} >
                        <MenuItem value='Income'>Income</MenuItem>
                        <MenuItem value='Expense'>Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth >
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>

                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='number' label='Amount' fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label='Date' fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Grid>

            <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction} >Create</Button>
        </Grid>
    )
}

export default Form
